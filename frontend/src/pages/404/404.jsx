import React from 'react';


import errorImage from '../../assets/images/404.svg'; 

import styles from './404.module.css';


const Page404 = () => {
    return (
        <div className={styles.pageContainer}>
 
            
            <main className={styles.mainContent}>
     
                <img 
                    src={errorImage} 
                    alt="Error 404 - Page not found" 
                    className={styles.errorCode} 
                />
                
                <p className={styles.errorMessage}>The page does not exist or has not been created yet</p>
                <a href="/" className={`${styles.btn} ${styles.btnPrimary}`}>Back to main page</a>
            </main>

        </div>
    );
};

export default Page404;