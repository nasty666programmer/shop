import "./profile.css";
import FaceIcon from "@material-ui/icons/Face";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { connect } from "react-redux";

function MenuProfileQuick(props) {
  return (
    <div className="wrapper_info_profile">
      {props.data.user ? (
        <div className="container_info_profile">
          <div className="user_photo_block_m">
            {/* <FaceIcon className="user_photo" /> */}
            <img className="user_photo" src={`${props.data.user.avatarUrl}`} alt='p' />
          </div>
          <div className="user_info">
            <div className='user_name_profile'>{props.data.user.name}</div>
            <div className='user_email'>{props.data.user.email}</div>
          </div>
          <div className="user_statisctic">
            <div className="border_user">
              <TrendingDownIcon id='money_down'/>
              1000
            </div>
            <div className="border_user ">
              <TrendingUpIcon id='money_up'/>
              1500
            </div>
          </div>
        </div>
      ) : (
        <p>Авторизируйтесь сначала</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps, null)(MenuProfileQuick);
