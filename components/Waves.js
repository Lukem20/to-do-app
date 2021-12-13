// Messing around trying to add some wave animation to the background of the homepage, I just got time to add a simple Wave svg.
const waves = ["M0,64L20,96C40,128,80,192,120,224C160,256,200,256,240,224C280,192,320,128,360,106.7C400,85,440,107,480,122.7C520,139,560,149,600,154.7C640,160,680,160,720,170.7C760,181,800,203,840,197.3C880,192,920,160,960,138.7C1000,117,1040,107,1080,112C1120,117,1160,139,1200,176C1240,213,1280,267,1320,261.3C1360,256,1400,192,1420,160L1440,128L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z",
      "M0 250L50 244.048C100 238.095 200 226.19 300 226.19C400 226.19 500 238.095 600 232.143C700 226.19 800 202.381 900 196.429C1000 190.476 1100 202.381 1150 208.333L1200 214.286V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V250Z",
      "M0 250L50 238.095C100 226.19 200 202.381 300 166.667C400 130.952 500 83.3333 600 101.19C700 119.048 800 202.381 900 214.286C1000 226.19 1100 166.667 1150 136.905L1200 107.143V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V250Z",
      "M0 125L50 111.111C100 97.2222 200 69.4444 300 97.2222C400 125 500 208.333 600 236.111C700 263.889 800 236.111 900 229.167C1000 222.222 1100 236.111 1150 243.056L1200 250V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V125Z"];

const Waves = () => {
    /*
      function animate() {
        let points = waves.map(x => {

            return [x,x+1];
        });
      

      document.querySelector("path").setAttribute("d", points);

      requestAnimationFrame(animate)
    }
    animate();
    */

 return (
    <svg className="wave-bottom" width="100" viewBox="0 0 1200 250">
        <path fillRule="evenodd" clipRule="evenodd" d="M0,96L21.8,106.7C43.6,117,87,139,131,128C174.5,117,218,75,262,64C305.5,53,349,75,393,96C436.4,117,480,139,524,122.7C567.3,107,611,53,655,37.3C698.2,21,742,43,785,80C829.1,117,873,171,916,170.7C960,171,1004,117,1047,90.7C1090.9,64,1135,64,1178,85.3C1221.8,107,1265,149,1309,176C1352.7,203,1396,213,1418,218.7L1440,224L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
         fill="#EDF2F7"/>
    </svg>
 )
}

export default Waves;