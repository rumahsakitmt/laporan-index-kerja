import {
  Wrench,
  Database,
  Network,
  Server,
  Globe,
  HardDrive,
  Bug,
  Code,
  Activity,
  Heart,
  Clock,
  HelpCircle,
  XCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export const getProblemIcon = (problem: string) => {
  const lowerProblem = problem.toLowerCase();

  if (
    lowerProblem.includes("maintenance") ||
    lowerProblem.includes("perangkat") ||
    lowerProblem.includes("komputer") ||
    lowerProblem.includes("laptop") ||
    lowerProblem.includes("printer")
  ) {
    return <Wrench className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("database") ||
    lowerProblem.includes("backup") ||
    lowerProblem.includes("data") ||
    lowerProblem.includes("simrs")
  ) {
    return <Database className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("jaringan") ||
    lowerProblem.includes("network") ||
    lowerProblem.includes("internet")
  ) {
    return <Network className="h-4 w-4" />;
  }
  if (lowerProblem.includes("server")) {
    return <Server className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("online") ||
    lowerProblem.includes("service") ||
    lowerProblem.includes("antrian")
  ) {
    return <Globe className="h-4 w-4" />;
  }
  if (lowerProblem.includes("backup") || lowerProblem.includes("storage")) {
    return <HardDrive className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("troubleshot") ||
    lowerProblem.includes("bug") ||
    lowerProblem.includes("error")
  ) {
    return <Bug className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("pengembangan") ||
    lowerProblem.includes("development") ||
    lowerProblem.includes("aplikasi")
  ) {
    return <Code className="h-4 w-4" />;
  }
  if (lowerProblem.includes("monitoring") || lowerProblem.includes("monitor")) {
    return <Activity className="h-4 w-4" />;
  }
  if (
    lowerProblem.includes("satu sehat") ||
    lowerProblem.includes("satusehat")
  ) {
    return <Heart className="h-4 w-4" />;
  }
  if (lowerProblem.includes("antrian") || lowerProblem.includes("queue")) {
    return <Clock className="h-4 w-4" />;
  }
  if (lowerProblem.includes("bpjs") || lowerProblem.includes("icare")) {
    return <Activity className="h-4 w-4" />;
  }

  return <HelpCircle className="h-4 w-4" />;
};

const userColors = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
];

export const getUserColor = (userName: string): string => {
  if (!userName) return "";

  let hash = 0;
  for (let i = 0; i < userName.length; i++) {
    const char = userName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const index = Math.abs(hash) % userColors.length;
  return userColors[index];
};

export const getStatusIcon = (status: string) => {
  const lowerStatus = status.toLowerCase();

  if (
    lowerStatus.includes("selesai") ||
    lowerStatus.includes("done") ||
    lowerStatus.includes("completed")
  ) {
    return <CheckCircle className="h-4 w-4 text-primary" />;
  }
  if (
    lowerStatus.includes("pending") ||
    lowerStatus.includes("menunggu") ||
    lowerStatus.includes("waiting")
  ) {
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  }
  if (
    lowerStatus.includes("dibatalkan") ||
    lowerStatus.includes("cancelled") ||
    lowerStatus.includes("failed")
  ) {
    return <XCircle className="h-4 w-4 text-red-500" />;
  }

  return <HelpCircle className="h-4 w-4 text-gray-500" />;
};
