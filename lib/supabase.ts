// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveOrder(orderData: {
  customerEmail: string;
  bookTitle: string;
  author: string;
  gradeLevel: string;
  length: number;
  isRush: boolean;
  sampleText?: string;
  stripeSessionId?: string;
}) {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        customer_email: orderData.customerEmail,
        book_title: orderData.bookTitle,
        author: orderData.author,
        grade_level: orderData.gradeLevel,
        length: orderData.length,
        is_rush: orderData.isRush,
        sample_text: orderData.sampleText,
        stripe_session_id: orderData.stripeSessionId,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateOrderWithReport(orderId: string, reportText: string) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      report_text: reportText,
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('id', orderId)
    .select();

  if (error) throw error;
  return data[0];
}