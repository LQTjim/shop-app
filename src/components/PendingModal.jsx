import React from "react";

const STYLES_OVERLAY = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 10000,
};
const STYLES_CONTENT = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "200px",
  height: "200px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  borderRadius: "25px",
  zIndex: 10000,
};
function PendingModal(props) {
  if (!props.show) return null;

  return (
    <>
      <div style={STYLES_OVERLAY}></div>
      <div style={STYLES_CONTENT}>{props.children}</div>
    </>
  );
}

export default PendingModal;
