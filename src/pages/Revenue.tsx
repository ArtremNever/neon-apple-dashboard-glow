
import { Layout } from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Revenue = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Revenue</h1>
          <p className="text-slate-400">Track your revenue and financial performance</p>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">Revenue tracking is under development.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Revenue;
