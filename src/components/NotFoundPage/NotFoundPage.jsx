import s from "./NotFoundPage.module.css"
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
      <div className={s.container}>
        <Link to="/">
          <MdArrowBack />
        </Link>
        <strong className={s.message}>
          Something went wrong... Maybe it's time to take a break and do some
          meditation🥰
        </strong>
      </div>
    );
}

export default NotFoundPage;