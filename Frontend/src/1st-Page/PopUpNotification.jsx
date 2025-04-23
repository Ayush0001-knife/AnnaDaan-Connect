const Notification = ({ message, type, onClose }) => {
  return (
    <div
      className={`notification ${type}`} // Type could be "success" or "error"
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        background: type === "success" ? "green" : "red",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <span>{message}</span>
      <button onClick={onClose} style={{ marginLeft: "10px", color: "white" }}>
        X
      </button>
    </div>
  );
};

export default Notification;
