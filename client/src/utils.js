export const formatActivity = (activity) => {
    const date = new Date(0);
      date.setUTCSeconds(activity.d_created);
      return {
        ...activity,
        displayDate: date.toLocaleString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        displayTime: date.toLocaleTimeString([], { timeStyle: "short" }),
        iconFileName:
          activity.topic_data &&
          activity.topic_data.icon_path.split("/").at(-1),
      };
}