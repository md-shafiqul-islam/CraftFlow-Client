import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Messages = () => {
  const axiosSecure = useAxiosSecure();

  // ================= FETCH MESSAGES =================
  const {
    data: messages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-messages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages");
      return res.data;
    },
  });

  const isEmpty = !messages || messages.length === 0;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl font-bold text-base-content">Messages Inbox</h2>
        <p className="text-sm text-base-content/60">
          All user inquiries and contact messages
        </p>
      </div>

      {/* ================= CONTENT ================= */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      ) : isError ? (
        <p className="text-center text-error py-10">Failed to load messages.</p>
      ) : isEmpty ? (
        <p className="text-center text-base-content/60 py-10">
          No messages found.
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-base-100 border border-base-300 rounded-xl p-5 hover:shadow-md transition"
            >
              {/* ================= TOP ROW ================= */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                {/* NAME */}
                <h3 className="font-semibold text-base-content text-lg">
                  {msg.name}
                </h3>

                {/* DATE */}
                <time
                  dateTime={msg.created_at}
                  className="text-xs text-base-content/60"
                  title={new Date(msg.created_at).toLocaleString()}
                >
                  {msg.created_at
                    ? new Date(msg.created_at).toLocaleDateString()
                    : "Unknown date"}
                </time>
              </div>

              {/* ================= EMAIL ================= */}
              <p className="text-sm text-primary mb-3">{msg.email}</p>

              {/* ================= MESSAGE ================= */}
              <div className="text-sm text-base-content/80 leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Messages;
