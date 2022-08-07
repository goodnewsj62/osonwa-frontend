import styles from "./styles/normal_card.css";


function NormalCard(props){
    return (
        <div className= {styles.normal__card}>
            <div  className={styles.card__img}>
                <img src="" alt="logo" />
            </div>
            <div className={styles.card__detail} >
                <p aria-label="title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate id quaerat fuga cum voluptates animi.
                </p>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
