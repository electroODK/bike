import s from './HeroRent.module.scss'
// import helmet from "/bike/frontend/src/adminsrc/assets/helmet.svg"

const HeroRent = () => {
  return (
    <>
      <section className={s.section}>
         <div className={s.container}>
            <div className={s.block_1}>
               <h3 className={s.title}>Аренда велосипедов
               c доставкой</h3>

               <div className={s.container_cards}>
                  <div className={s.card}>
                     <img src="/helmet.svg" alt="option" />
                     <div className={s.text}>

                     <h4 className={s.product}>Шлем</h4>
                     <h2 className={s.price_type}>Бесплатно</h2>
                     </div>
                  </div>
                  <div className={s.card}>
                     <img src="/helmet.svg" alt="option" />
                     <div className={s.text}>

                     <h4 className={s.product}>Шлем</h4>
                     <h2 className={s.price_type}>Бесплатно</h2>
                     </div>
                  </div>
                  <div className={s.card}>
                     <img src="/helmet.svg" alt="option" />
                     <div className={s.text}>

                     <h4 className={s.product}>Шлем</h4>
                     <h2 className={s.price_type}>Бесплатно</h2>
                     </div>
                  </div>
               </div>


            </div>

            <div className={s.block_2}>
               <div className={s.inputs}>
                  {/* <div className={block}></div>
                  <div className={block}></div>
                  <div className={block}></div>
                  <div className={block}></div> */}
               </div>
            </div>
         </div>
      </section>
    </>
  )
}

export default HeroRent