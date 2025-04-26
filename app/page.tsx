import Form from "../components/Form";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Rush My Book Report</h1>
        <p className="text-lg mb-8">
          No stress. No panic. Get your custom book report rushed in hours.
        </p>
        <Form />
      </div>
    </div>
  );
}
