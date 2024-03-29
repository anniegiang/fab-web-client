import {withSessionSsr} from "config/withSession";
import UserController from "server/controllers/UserController";
import MessageController from "server/controllers/MessageController";
import Messages from "client/components/messages/Messages";
import Notifications from "client/components/notifications/Notifications";
import styles from "client/styles/Index.module.css";
import {NewestMessagesResponse, Message} from "types/message";
import {NotificationsReponse, Notification} from "types/notification";

type Props = {
  newestMessages: Message[];
  notifications: Notification[];
};

export default ({newestMessages, notifications}: Props) => {
  const hasNewestMessages = newestMessages.length > 0;
  const hasNotifications = notifications.length > 0;

  return (
    <div className={styles.rootContainer}>
      <section className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>
          {hasNotifications ? "Notifications" : "No notifications"}
        </h1>
        {hasNotifications && <Notifications notifications={notifications} />}
      </section>
      <section className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>
          {hasNewestMessages ? "Newest messages" : "No newest messages"}
        </h1>
        {hasNewestMessages && (
          <Messages messages={newestMessages} showSectionTitle={false} />
        )}
      </section>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({req}) {
    const {authHeaders} = req.session;

    const newestMessagesResponse: NewestMessagesResponse =
      await MessageController.getNewestMessages(authHeaders);

    const notificationsResponse: NotificationsReponse =
      await UserController.getNotifications(authHeaders);

    return {
      props: {
        newestMessages: newestMessagesResponse.messages,
        notifications: notificationsResponse.notifications
      }
    };
  }
);
