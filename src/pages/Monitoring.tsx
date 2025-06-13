
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw,
  Cpu,
  Server,
  HardDrive,
  Wifi
} from 'lucide-react';
import { MetricCard } from '@/components/monitoring/MetricCard';
import { GrafanaSection } from '@/components/monitoring/GrafanaSection';
import { ServiceCard } from '@/components/monitoring/ServiceCard';
import { AlertsPanel } from '@/components/monitoring/AlertsPanel';
import { QuickActionsBar } from '@/components/monitoring/QuickActionsBar';

const Monitoring = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Simulate real-time data updates
  const [metrics, setMetrics] = useState({
    cpu: { value: 45, trend: [30, 35, 40, 45, 42, 48, 45, 43, 46, 44, 45, 47] },
    memory: { value: 62, trend: [55, 58, 60, 62, 64, 61, 63, 62, 65, 63, 62, 64] },
    disk: { value: 78, trend: [75, 76, 77, 78, 77, 79, 78, 80, 78, 79, 77, 78] },
    network: { value: 1.2, trend: [0.8, 0.9, 1.1, 1.2, 1.3, 1.1, 1.2, 1.4, 1.2, 1.1, 1.2, 1.3] }
  });

  const systemMetrics = [
    { 
      title: 'CPU Usage', 
      value: metrics.cpu.value, 
      unit: '%', 
      status: metrics.cpu.value > 80 ? 'critical' : metrics.cpu.value > 60 ? 'warning' : 'normal',
      icon: Cpu,
      trend: metrics.cpu.trend,
      details: [
        { label: 'Cores', value: '8' },
        { label: 'Load Avg', value: '3.2' }
      ]
    },
    { 
      title: 'Memory Usage', 
      value: metrics.memory.value, 
      unit: '%', 
      status: metrics.memory.value > 80 ? 'critical' : metrics.memory.value > 60 ? 'warning' : 'normal',
      icon: Server,
      trend: metrics.memory.trend,
      details: [
        { label: 'Total', value: '32 GB' },
        { label: 'Available', value: '12 GB' }
      ]
    },
    { 
      title: 'Disk Usage', 
      value: metrics.disk.value, 
      unit: '%', 
      status: metrics.disk.value > 80 ? 'critical' : metrics.disk.value > 60 ? 'warning' : 'normal',
      icon: HardDrive,
      trend: metrics.disk.trend,
      details: [
        { label: 'Total', value: '2 TB' },
        { label: 'Free', value: '440 GB' }
      ]
    },
    { 
      title: 'Network I/O', 
      value: metrics.network.value, 
      unit: 'GB/s', 
      status: 'normal',
      icon: Wifi,
      trend: metrics.network.trend,
      details: [
        { label: 'Ingress', value: '0.8 GB/s' },
        { label: 'Egress', value: '0.4 GB/s' }
      ]
    },
  ];

  const services = [
    { 
      name: 'Campaign Management API', 
      endpoint: 'api.example.com/campaigns',
      status: 'healthy', 
      uptime: '99.9%', 
      responseTime: '125ms',
      version: 'v2.3.1',
      lastDeployed: '2 days ago'
    },
    { 
      name: 'AI Agent Service', 
      endpoint: 'ai.example.com',
      status: 'healthy', 
      uptime: '99.7%', 
      responseTime: '89ms',
      version: 'v1.8.2',
      lastDeployed: '1 week ago'
    },
    { 
      name: 'Database Cluster', 
      status: 'healthy', 
      uptime: '100%', 
      responseTime: '45ms',
      version: 'PostgreSQL 15',
      lastDeployed: '3 weeks ago'
    },
    { 
      name: 'Message Queue', 
      endpoint: 'queue.example.com',
      status: 'degraded', 
      uptime: '98.2%', 
      responseTime: '234ms',
      version: 'Redis 7.0',
      lastDeployed: '5 days ago'
    },
    { 
      name: 'Analytics Engine', 
      endpoint: 'analytics.example.com',
      status: 'healthy', 
      uptime: '99.8%', 
      responseTime: '156ms',
      version: 'v3.1.0',
      lastDeployed: '1 day ago'
    },
    { 
      name: 'Load Balancer', 
      status: 'healthy', 
      uptime: '99.99%', 
      responseTime: '12ms',
      version: 'NGINX 1.24',
      lastDeployed: '2 weeks ago'
    },
  ];

  const alerts = [
    { 
      id: 'alert-1',
      severity: 'warning' as const,
      title: 'High Memory Usage',
      description: 'Memory usage exceeded 90% threshold on prod-server-01. Consider scaling up or optimizing memory usage.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      isNew: true,
      service: 'Campaign Management API'
    },
    { 
      id: 'alert-2',
      severity: 'critical' as const,
      title: 'Message Queue Connection Timeout',
      description: 'Redis connection pool exhausted. Multiple connection timeouts detected.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      isNew: true,
      service: 'Message Queue'
    },
    { 
      id: 'alert-3',
      severity: 'info' as const,
      title: 'Campaign Sync Completed',
      description: 'Successfully synchronized 12,450 campaigns with external partners.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      resolved: true,
      service: 'Analytics Engine'
    },
    { 
      id: 'alert-4',
      severity: 'warning' as const,
      title: 'Disk Space Low',
      description: 'Available disk space on /var/log partition is below 20%.',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      service: 'Database Cluster'
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setMetrics(prev => ({
        cpu: { 
          value: Math.max(20, Math.min(90, prev.cpu.value + (Math.random() - 0.5) * 10)),
          trend: [...prev.cpu.trend.slice(1), Math.max(20, Math.min(90, prev.cpu.value + (Math.random() - 0.5) * 10))]
        },
        memory: { 
          value: Math.max(30, Math.min(95, prev.memory.value + (Math.random() - 0.5) * 8)),
          trend: [...prev.memory.trend.slice(1), Math.max(30, Math.min(95, prev.memory.value + (Math.random() - 0.5) * 8))]
        },
        disk: { 
          value: Math.max(50, Math.min(90, prev.disk.value + (Math.random() - 0.5) * 3)),
          trend: [...prev.disk.trend.slice(1), Math.max(50, Math.min(90, prev.disk.value + (Math.random() - 0.5) * 3))]
        },
        network: { 
          value: Math.max(0.5, Math.min(2.0, prev.network.value + (Math.random() - 0.5) * 0.3)),
          trend: [...prev.network.trend.slice(1), Math.max(0.5, Math.min(2.0, prev.network.value + (Math.random() - 0.5) * 0.3))]
        }
      }));
      setIsRefreshing(false);
    }, 2000);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRefreshing) {
        setMetrics(prev => ({
          cpu: { 
            value: Math.max(20, Math.min(90, prev.cpu.value + (Math.random() - 0.5) * 5)),
            trend: [...prev.cpu.trend.slice(1), Math.max(20, Math.min(90, prev.cpu.value + (Math.random() - 0.5) * 5))]
          },
          memory: { 
            value: Math.max(30, Math.min(95, prev.memory.value + (Math.random() - 0.5) * 3)),
            trend: [...prev.memory.trend.slice(1), Math.max(30, Math.min(95, prev.memory.value + (Math.random() - 0.5) * 3))]
          },
          disk: { 
            value: Math.max(50, Math.min(90, prev.disk.value + (Math.random() - 0.5) * 1)),
            trend: [...prev.disk.trend.slice(1), Math.max(50, Math.min(90, prev.disk.value + (Math.random() - 0.5) * 1))]
          },
          network: { 
            value: Math.max(0.5, Math.min(2.0, prev.network.value + (Math.random() - 0.5) * 0.2)),
            trend: [...prev.network.trend.slice(1), Math.max(0.5, Math.min(2.0, prev.network.value + (Math.random() - 0.5) * 0.2))]
          }
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isRefreshing]);

  return (
    <Layout>
      <div className="p-6 space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              System Monitoring
            </h1>
            <p className="text-slate-400">Real-time system health and performance insights</p>
          </div>
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {/* Quick Actions */}
        <QuickActionsBar />

        {/* System Metrics */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">System Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={typeof metric.value === 'number' ? Math.round(metric.value * 10) / 10 : metric.value}
                unit={metric.unit}
                status={metric.status as 'normal' | 'warning' | 'critical'}
                icon={metric.icon}
                details={metric.details}
                trend={metric.trend}
              />
            ))}
          </div>
        </div>

        {/* Grafana Integration */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Performance Dashboards</h2>
          <GrafanaSection 
            isConfigured={false} 
            grafanaUrl="https://grafana.example.com"
          />
        </div>

        {/* Services and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Status */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Services Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.name}
                  name={service.name}
                  endpoint={service.endpoint}
                  status={service.status as 'healthy' | 'degraded' | 'unhealthy'}
                  uptime={service.uptime}
                  responseTime={service.responseTime}
                  version={service.version}
                  lastDeployed={service.lastDeployed}
                />
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div>
            <AlertsPanel 
              alerts={alerts}
              newAlertsCount={2}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Monitoring;
