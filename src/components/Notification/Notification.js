import React from "react";
import "./notification.scss";
import { Snackbar } from "@material-ui/core";
import { observer } from "mobx-react";
import { useCounterStore } from "../../store/counterStore";

const Notification = observer(() => {
  const counterStore = useCounterStore();

  return (
    <div className="notification">
      <Snackbar
        message="New destruction achieved!"
        open={counterStore.notificationOpen}
      />
    </div>
  );
});

export default Notification;
