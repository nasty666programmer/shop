import HeaderDashboard from "../components/DashBoard/HeaderDashboard"
import ProfileDashboard from "../components/DashBoard/ProfileDashboard"
import '../components/DashBoard/dashboard_style.css';
import GraphStatistic from "../components/DashBoard/GraphStatistic"
import Settings from "../components/DashBoard/Settings"
import CreateProductCard from '../components/Product/CreateProductCard';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import StatiscticMoney from "../components/DashBoard/StatisticMoney";
import {useEffect} from 'react';
import {dashboard} from '../request/dashboard';
import React, { Suspense,useState } from 'react';
import {connect} from 'react-redux';
import {addUser} from '../store/action';





function Dashboard (props) {

    const [data,setData] = useState()
 useEffect(() => { 
      let res = dashboard()
      return res.then(res => props.addUser(res.data.user))
      .catch(err => console.log(err))
 })
    return (
        <div>

            <div className='header_dashboard'>
                <HeaderDashboard />
            </div>
            <div className='main_dashboard'>
                <div className='wrapper-carousel'>
                    <Carousel 
                        showStatus={false}
                        width={'70rem'}
                        autoPlay={true}
                        infiniteLoop={true}
                        >
                    <div className='carousel'>
                        <ProfileDashboard className="legend"/> 
                        <CreateProductCard />
                    </div>
                        <div className='carousel'>
                            <GraphStatistic />
                            <StatiscticMoney />                          
                        </div>
                        <div>
                            <Settings />
                        </div>
                    </Carousel>   
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    addUser
}

export default connect(null,mapDispatchToProps)(Dashboard);