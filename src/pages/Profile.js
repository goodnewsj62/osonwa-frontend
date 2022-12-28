import Main from "components/others/MainWrapper";





const Profile =  ()=>{
    return (
        <Main>
            <div className="container">
                <section className={``}>
                    <section>
                        <div className="header">
                            <div className="profile__img">
                                <img src={``} alt="profile" />
                            </div>
                            <div className="edit__button">
                                <button>
                                    <span>
                                        Edit Profile
                                    </span>
                                    <i>
                                        {/* <HiPencil /> */}
                                    </i>
                                </button>
                            </div>  
                        </div>
                        <div className="bio">

                        </div>
                        <div className="social__acc"></div>
                        <div className="tags">

                        </div>
                    </section>
                    <div>

                    </div>
                    <section>

                    </section>
                </section>
                <section className={``}>
                </section>
            </div>
        </Main>
    )
};



export default Profile;