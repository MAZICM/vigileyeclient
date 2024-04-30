import { getLogsCollection } from './lib/lib';
// pages/logs.js


export async function getServerSideProps() {
  try {
    const collection = await getLogsCollection();
    const logs = await collection.find({}).toArray();

    const formattedLogs = logs.map((log) => ({
      ...log,
      _id: log._id.toString(),  // Convert ObjectId to string
      scan_time: log.scan_time ? log.scan_time.toISOString() : null,  // Convert Date to ISO string
    }));

    return {
      props: {
        logs: formattedLogs,
      },
    };
  } catch (error) {
    console.error('Error fetching logs:', error);
    return {
      props: {
        logs: [],
      },
    };
  }
}

export default function LogsPage({ logs }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Logs</h1>
      {logs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Scan Time</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Card ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Owner Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Detected Face</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Expected Card ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Access Decision</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="px-4 py-2 text-sm text-gray-700">{log.scan_time}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{log.cardID}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{log.owner_name || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{log.detected_face || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{log.expected_cardID || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{log.access_decision || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-700">No logs found.</p>
      )}
    </div>
  );
}
