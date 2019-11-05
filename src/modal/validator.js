import { CONFIRMATION, SELECT, INPUT } from "modal/types";

export function validateModalData(modal) {
  const { type = CONFIRMATION } = modal;
  switch (type) {
    case SELECT:
      return validateSelectModalData(modal);
    case INPUT:
      return validateInputModalData(modal);
    default:
      return validateConfirmationModalData(modal);
  }
}

function validateConfirmationModalData({
  visible = true,
  title = "Title",
  text = "Description",
  onConfirm = () => {}
}) {
  return {
    type: CONFIRMATION,
    visible,
    title,
    text,
    onConfirm
  };
}

function validateSelectModalData({
  visible = true,
  title = "Title",
  text = "Description",
  options = []
}) {
  return {
    type: SELECT,
    visible,
    title,
    text,
    options
  };
}

function validateInputModalData({
  visible = true,
  title = "Title",
  text = "Description",
  onConfirm = () => {}
}) {
  return {
    type: INPUT,
    visible,
    title,
    text,
    onConfirm
  };
}
