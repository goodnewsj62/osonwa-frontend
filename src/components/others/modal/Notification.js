import NoticationCard from "../cards/NotificationCard";

const NotificationBoard=  ()=>{

    const notifications =  [1,2,3].map((not)=>{
        const data =  {
            title: "mentioned you",
            username: "someusername",
            date: "2022=02-04T22:07:22:0000Z",
            imgSrc: "99.897.89.45/someloc/img.jpg",
            readStatus: false
        }
        return <NoticationCard data={data} />
    });

    return (
        <section className={``}>
            <span>Notification</span>
            <div className={``}>
                {notifications}
            </div>
        </section>
    );
};

export default NotificationBoard;