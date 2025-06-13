
import { Layout } from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Server, 
  Database, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw
} from 'lucide-react';

const Monitoring = () => {
  const systemMetrics = [
    { title: 'CPU Usage', value: '45%', status: 'normal', icon: Cpu, color: 'text-green-400' },
    { title: 'Memory Usage', value: '62%', status: 'warning', icon: Server, color: 'text-yellow-400' },
    { title: 'Disk Usage', value: '78%', status: 'warning', icon: HardDrive, color: 'text-yellow-400' },
    { title: 'Network I/O', value: '1.2 GB/s', status: 'normal', icon: Wifi, color: 'text-green-400' },
  ];

  const services = [
    { name: 'Campaign Management API', status: 'healthy', uptime: '99.9%', responseTime: '125ms' },
    { name: 'AI Agent Service', status: 'healthy', uptime: '99.7%', responseTime: '89ms' },
    { name: 'Database Cluster', status: 'healthy', uptime: '100%', responseTime: '45ms' },
    { name: 'Message Queue', status: 'degraded', uptime: '98.2%', responseTime: '234ms' },
    { name: 'Analytics Engine', status: 'healthy', uptime: '99.8%', responseTime: '156ms' },
  ];

  const alerts = [
    { 
      id: 1, 
      severity: 'warning', 
      message: 'High memory usage detected on worker-node-3', 
      timestamp: '2024-01-13T10:30:00Z',
      resolved: false
    },
    { 
      id: 2, 
      severity: 'error', 
      message: 'Message queue connection timeout', 
      timestamp: '2024-01-13T09:45:00Z',
      resolved: false
    },
    { 
      id: 3, 
      severity: 'info', 
      message: 'Campaign sync completed successfully', 
      timestamp: '2024-01-13T09:15:00Z',
      resolved: true
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-600 text-green-100';
      case 'degraded': return 'bg-yellow-600 text-yellow-100';
      case 'unhealthy': return 'bg-red-600 text-red-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'unhealthy': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-600 text-red-100';
      case 'warning': return 'bg-yellow-600 text-yellow-100';
      case 'info': return 'bg-blue-600 text-blue-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Monitoring</h1>
            <p className="text-slate-400">Real-time system health and performance metrics</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric) => (
            <Card key={metric.title} className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <Badge className={`mt-2 ${metric.status === 'normal' ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'} border-none text-xs`}>
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Grafana Dashboard Placeholder */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Grafana Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-800/30 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-slate-600">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Grafana Dashboard Integration</h3>
                <p className="text-slate-400 mb-4">Embed your Prometheus/Grafana dashboard here</p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Configure Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Services Status */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Server className="w-5 h-5" />
                Services Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(service.status)} border-none`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(service.status)}
                          <span className="capitalize">{service.status}</span>
                        </div>
                      </Badge>
                      <div>
                        <div className="text-white font-medium">{service.name}</div>
                        <div className="text-slate-400 text-sm">Uptime: {service.uptime}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-300 text-sm">{service.responseTime}</div>
                      <div className="text-slate-400 text-xs">Avg Response</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === 'error' ? 'border-red-500 bg-red-500/10' :
                    alert.severity === 'warning' ? 'border-yellow-500 bg-yellow-500/10' :
                    'border-blue-500 bg-blue-500/10'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`${getSeverityColor(alert.severity)} border-none text-xs`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          {alert.resolved && (
                            <Badge className="bg-green-600 text-green-100 border-none text-xs">
                              RESOLVED
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-300 text-sm mb-1">{alert.message}</p>
                        <p className="text-slate-400 text-xs">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Monitoring;
