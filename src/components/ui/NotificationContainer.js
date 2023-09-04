import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NotificationContainer() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="colored"
        />
    );
}

export default NotificationContainer;