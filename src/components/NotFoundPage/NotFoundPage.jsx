import s from "./NotFoundPage.module.css"
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
      <>
        <Link to="/">
          <MdArrowBack />
        </Link>
        <strong>
          Something went wrong... Maybe it's time to take a break and do some
          meditation🥰
        </strong>
      </>
    );
}

export default NotFoundPage;