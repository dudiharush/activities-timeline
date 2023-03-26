export const formatActivity = (activity) => {
    const date = new Date(0);
      date.setUTCSeconds(activity.d_created);
      return {
        ...activity,
        formattedDate: date.toLocaleString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        formattedTime: date.toLocaleTimeString([], { timeStyle: "short" }),
        date,
        iconFileName:
          activity.topic_data &&
          activity.topic_data.icon_path.split("/").at(-1),
      };
}