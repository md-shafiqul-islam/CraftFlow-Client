import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Messages = () => {
  const axiosSecure = useAxiosSecure();

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

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-accent">User Messages</h2>

      {isError ? (
        <p className="text-center text-error">Failed to load messages.</p>
      ) : isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      ) : messages.length === 0 ? (
        <p className="text-center text-accent">No messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map(({ _id, name, email, message, created_at }) => (
            <div
              key={_id}
              className="p-6 bg-base-100 rounded-lg shadow-md border border-base-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-accent">{name}</h3>
                <time
                  dateTime={created_at}
                  className="text-sm text-text-accent"
                  title={new Date(created_at).toLocaleString()}
                >
                  {new Date(created_at).toLocaleDateString()}
                </time>
              </div>
              <p className="mb-6 text-text-accent italic">{email}</p>
              <p className="text-base whitespace-pre-wrap">{message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Messages;
