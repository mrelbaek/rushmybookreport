// app/api/process-pending-orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { generateReport } from '../../../lib/openai';
import { sendReportDelivery } from '../../../lib/resend';

// This can be triggered by a cron job
export async function POST(req: NextRequest) {
  try {
    // Check for API key auth
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== process.env.CRON_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get pending orders, prioritizing rush orders
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'pending')
      .order('is_rush', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(10); // Process in batches
    
    if (error) throw error;
    
    let processed = 0;
    for (const order of orders) {
      try {
        // Generate report
        const report = await generateReport({
          bookTitle: order.book_title,
          author: order.author,
          level: order.grade_level,
          length: order.length,
          sampleText: order.sample_text,
        });
        
        // Update order with report
        await supabase
          .from('orders')
          .update({
            report_text: report,
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', order.id);
        
        // Send email with report
        await sendReportDelivery({
          customerEmail: order.customer_email,
          bookTitle: order.book_title,
          reportText: report,
        });
        
        processed++;
      } catch (orderError) {
        console.error(`Error processing order ${order.id}:`, orderError);
        
        // Mark as failed
        await supabase
          .from('orders')
          .update({
            status: 'failed',
            error_message: orderError.message,
          })
          .eq('id', order.id);
      }
    }
    
    return NextResponse.json({ success: true, processed });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}