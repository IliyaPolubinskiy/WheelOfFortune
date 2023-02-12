import React, { Component, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap';
import { Wheel } from 'react-custom-roulette'
import AuthForm from './AuthForm';

/* function MiscContainer(props) {
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleChangeSize = function() {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current);
  }

  useEffect(() => {
    window.addEventListener("resize", handleChangeSize);
    window.addEventListener("load", handleChangeSize);
  }, []);

  return (

    <div className='d-flex flex-fill flex-grow-1 align-items-stretch' ref={ref}>
      <p>
        {width}
      </p>
      <p>
        {height}
      </p>
      {height < 100 ? 

      <span>less than 100</span>:<span>more than 100</span>
      
      }

    </div>
  );
} */
function WinnerListElement(props) {
  const ref = useRef([]);

  const [size, setSize] = useState(0);

  const handleChangeSize = function() {
    const gettedSize = [ref.current.offsetWidth, ref.current.offsetHeight]
    setSize(gettedSize);
    props.onElementSizeChanging(gettedSize);
  }

  useEffect(() => {
    window.addEventListener("resize", handleChangeSize);
    window.addEventListener("load", handleChangeSize);
  }, []);

  return (
    <>
    <div ref={ref} className="list-element align-items-center p-2 align-content-center d-flex justify-content-between px-2 m-2">
      <div>
        <span className='winner-list-text-elem'>
          <svg height="50" width="50">
            <circle cx="25" cy="25" r="20" stroke="black" strokeWidth="3" fill="grey" />
            Sorry, your browser does not support inline SVG.  
          </svg> 
        </span>        
      </div>
      <div style={{width: 35 + "%"}}>
        <span className='winner-list-text-elem'>{props.username}</span>
      </div>
      <div style={{width: 35 + "%"}}>
        <span className='winner-list-text-elem'>{props.winning_amount} <img className='coins_img' src="../static/frontend/images/coins1.svg" alt="coins" width="40px" height="25px"></img></span>
      </div>
      <div style={{width: 20 + "%"}}>
        {0 <= Math.ceil((Date.now()-Date.parse(props.win_date))/1000) & Math.ceil((Date.now()-Date.parse(props.win_date))/1000) < 60 ?
          <span className='winner-list-text-elem'>{Math.ceil((Date.now()-Date.parse(props.win_date))/1000)} s.</span> : ""
        }
        {60 <= Math.ceil((Date.now()-Date.parse(props.win_date))/1000) & Math.ceil((Date.now()-Date.parse(props.win_date))/1000) < 3600 ?
          <span className='winner-list-text-elem'>{Math.ceil(((Date.now()-Date.parse(props.win_date))/1000)/60)} m.</span> : ""
        }
        {3600 <= Math.ceil((Date.now()-Date.parse(props.win_date))/1000) & Math.ceil((Date.now()-Date.parse(props.win_date))/1000) < 86400 ?
          <span className='winner-list-text-elem'>{Math.ceil((((Date.now()-Date.parse(props.win_date))/1000)/60)/60)} h.</span> : ""
        }
        {86400 <= Math.ceil((Date.now()-Date.parse(props.win_date))/1000) & Math.ceil((Date.now()-Date.parse(props.win_date))/1000) < 2419200 ?
          <span className='winner-list-text-elem'>{Math.ceil((((Date.now()-Date.parse(props.win_date))/1000)/60)/60)} d.</span> : ""
        }
      </div>
    </div>
    </>
  )
}

class WinnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      elementsCount: 5,
      containerSize: [],
      listSize: [],
      elemSize: [],
    };
    this.containerRef = React.createRef();
    this.listRef = React.createRef();
    this.elemRef = React.createRef();
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.handleChangeSize = this.handleChangeSize.bind(this)
    this.removeFromList = this.removeFromList.bind(this)
    this.addToList = this.addToList.bind(this)
  }

  handleChangeSize() {
    this.setState({
      containerSize: [this.containerRef.current.offsetWidth, this.containerRef.current.offsetHeight],
      listSize: [this.listRef.current.offsetWidth, this.listRef.current.offsetHeight]
    });
    console.log("resize")
  }

  componentDidMount() {
    this.handleChangeSize()
  }

  componentDidUpdate() {
    console.log(!(this.state.data.slice().length == this.props.winnersList.slice(0, this.state.elementsCount).length))
    console.log(this.state.data.values(),  this.props.winnersList.slice(0, this.state.elementsCount).values())
    if (!(this.state.data.slice().length == this.props.winnersList.slice(0, this.state.elementsCount).length)) {
      this.setState({
        data: this.props.winnersList.slice(0, this.state.elementsCount),
      })
    }
    window.addEventListener("resize", this.handleChangeSize);  
  }

  addToList() {
    this.setState({
      elementsCount: this.state.elementsCount + 1,
    })
  }
  removeFromList() {
    this.setState({
      elementsCount: this.state.elementsCount - 1,
    })
  }

  render() {
    return (
      <>
      <div ref={this.containerRef} className="winners-container m-2 p-2" style={{minWidth: 32 + "vw"}}>
        <span className='winners-title my-3'>WINNERS</span>
        <div ref={this.listRef}>
          {this.state.data.slice(0, this.state.elementsCount).map(winner => {
            return (
              <WinnerListElement onElementSizeChanging={(size) => this.setState({elemSize: size})} key={winner.id} username={winner.winner} winning_amount={winner.winning_amount} win_date={winner.win_date}/>
            );
          })}
          {/* <MiscContainer/> */}
          <span>container height {this.state.containerSize[1]}</span>
          <span>list height {this.state.listSize[1]}</span>
          <span>elem height {this.state.elemSize[1]}</span>
          <button onClick={this.addToList}></button>
          <button onClick={this.removeFromList}></button>
        </div>
      </div>
      </>
    );
  }
}


function Button(props) {
  const buttonDisabled = props.buttonDisabled

  if (buttonDisabled) {
    return (
      <>
        <button className='d-inline-flex p-1 flex-column button-group-element' disabled onClick={props.onClick}>
          <span className='info-group-text p-2'>{props.title_first_line}</span> 
          {props.title_second_line && <span className='info-group-text p-2'>{props.title_second_line}</span>} 
        </button>
      </>
    )
  } else {
    return (
      <>
        <button className='d-inline-flex p-1 flex-column button-group-element' onClick={props.onClick}>
          <span className='info-group-text p-2'>{props.title_first_line}</span> 
          {props.title_second_line && <span className='info-group-text p-2'>{props.title_second_line}</span>} 
        </button>
      </>
    )
  }
}

function Jackpot(props) {
  return (
    <>
      <div className='d-inline-flex p-1 align-items-center justify-content-center flex-column info-group-element'>
        <span className='info-group-text p-2'>JACKPOT</span>
        <span className='info-group-text p-2'>1000</span>
      </div>
    </>
  )
}

function Layout(props) {
  const Style = (`
    .myLayout {
      display: ${props.layout ? "flex" : "none" };
    }

    html {
      overflow-y: ${props.layout ? "hidden" : "overlay" };
    }
  `)

  return (
      <>
        <style>{Style}</style>
        <div className='align-items-center flex-column justify-content-center text-center myLayout'>
          <span className='winner-text my-2'>{props.firstText}</span>
            {props.layoutImage == true && <span className='winner-text my-2'>{props.secondText}
              <img className='coins_img' src="../static/frontend/images/coins1.svg" alt="coins" width="80px" height="48px"></img>
            </span>}
          <Button title_first_line="GREAT" onClick={props.hideLayout}/>
        </div>
      </>
    )      
}

function Balance(props) {
  return (
    <>
      <div className='d-inline-flex p-1 align-items-center justify-content-center flex-column info-group-element'>
        <span className='info-group-text p-2'>BALANCE</span>
        <span className='info-group-text p-2'>{props.balance}</span>
      </div>
    </>

  )
}

class InfoGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: props.balance,
      loaded: false,
      layout: false,
      layoutFirstText: props.layoutFirstText,
      layoutSecondText: props.layoutSecondText,
      layoutImage: props.layoutImage,
      buttonDisabled: props.buttonDisabled,
    },
    this.handleClickHideLayout = this.handleClickHideLayout.bind(this);
    this.setState = this.setState.bind(this);
  }


  componentDidUpdate() {
    if (!(this.state.balance == this.props.balance)) {
      this.setState({
        balance: this.props.balance
      })
    }
    if (!(this.state.layoutFirstText == this.props.layoutFirstText)) {
      this.setState({
        layoutFirstText: this.props.layoutFirstText
      })
    }
    if (!(this.state.layoutSecondText == this.props.layoutSecondText)) {
      this.setState({
        layoutSecondText: this.props.layoutSecondText
      })
    }
    if (!(this.state.layoutImage == this.props.layoutImage)) {
      this.setState({
        layoutImage: this.props.layoutImage
      })
    }
    if (!(this.state.layout == this.props.layout)) {
      this.setState({
        layout: this.props.layout
      })
    }
    if (!(this.state.buttonDisabled == this.props.buttonDisabled)) {
      this.setState({
        buttonDisabled: this.props.buttonDisabled
      })
    }
  }
  
  handleClickHideLayout() {
    this.setState({
      layout: false,
    })
  }


  render() {
    return (
      <>
        <div className='d-flex m-2 flex-row justify-content-between info-group'>
          <Balance balance={this.state.balance}/>
          <Jackpot />
          <Button buttonDisabled={this.state.buttonDisabled} title_first_line="SPIN" title_second_line="WHEEL" onClick={this.props.onClick}/>
          <Layout 
            layoutImage={this.state.layoutImage}
            firstText={this.state.layoutFirstText}        
            secondText={this.state.layoutSecondText}
            hideLayout={this.props.hideLayout} 
            layout={this.state.layout}
          />
        </div>
      </>
    )
  }
}

class WheelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mustSpin: this.props.mustSpin,
      prizes: [],
      prizeIndex: this.props.prizeIndex,
    }
    this.handleStopSpinning = this.handleStopSpinning.bind(this)
  }

  async getPrizes() {
    let obj;
    const res = await fetch('/API/Prizes')
    obj = await res.json();
    let data = []

    for (let i in obj) {
      if (i % 2 == 0) {
        data.push({ option: obj[i], style: { backgroundColor: "#f2af05", textColor: '#ffffff' }});
      } else {
        data.push({ option: obj[i], style: { backgroundColor: "#32312f", textColor: '#ffffff' } });
      }
    }

    this.setState({
      prizes: data,
    })
  }

  componentDidMount() {
    this.getPrizes()
  }

  componentDidUpdate() {
    if (!this.props.mustSpin == this.state.mustSpin) {
      this.setState({
        mustSpin: this.props.mustSpin
      })
    }
    if (!(this.props.prizeIndex == this.state.prizeIndex)) {
      this.setState({
        prizeIndex: this.props.prizeIndex
      })
      this.props.startWheelSpin()
    }
  }

  handleStopSpinning() {
    this.props.onSpinningEnd()
  }

  render() {
    return (
      <>
        <div className='my-container flex-grow-1 m-2'>
          <Wheel
            radiusLineWidth = {0}
            textDistance = {80}
            outerBorderColor = "#bfbebd"
            outerBorderWidth = {20}
            fontFamily = "Luckiest Guy"
            fontSize = {40}
            perpendicularText = {true}
            spinDuration = {0.02}
            onStopSpinning={this.handleStopSpinning}
            mustStartSpinning={this.state.mustSpin}
            prizeNumber={this.state.prizeIndex}
            data={this.state.prizes}
            />
        </div>
      </>
    )
  }
}

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prizeIndex: null,
      prizeCode: null,
      balance: this.props.balance,
      mustSpin: false,
      layoutFirstText: null,
      layoutSecondText: null,
      buttonDisabled: false,
    };
    this.handleClick = this.handleClick.bind(this)
    this.hideLayout = this.hideLayout.bind(this)
    this.startWheelSpin = this.startWheelSpin.bind(this)
    this.handleStopSpinning = this.handleStopSpinning.bind(this)
  }
  
  getCookie(name) {
    if (!document.cookie) {
      return null;
    }
  
    const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));
  
    if (xsrfCookies.length === 0) {
      return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }


  componentDidUpdate() {
    if (!(this.state.balance == this.props.balance) && (this.state.balance == 0) && this.state.responseBalance == null){
      this.setState({
        balance: this.props.balance,
      })
    }
  }

  makeSpinRequest() {
    let csrftoken = this.getCookie('csrftoken')
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch('/API/Spinner', requestOptions)
      .then(response => response.json())
      .then(response => {
        this.setState({
          prizeIndex: response["prize_index"],
          prize: response["result"],
          responseBalance: response["user_balance"],
        })
        this.setLayoutText(response["result"])
      });
  }

  startWheelSpin() {
    if (this.state.prize >= 0) {
      this.setState({
        mustSpin: true,
        buttonDisabled: true,
      })
    }
  }

  setLayoutText(prize) {
    if (prize == 0) {
      this.setState({
        layoutFirstText: "YOU WON NOTHING, TRY AGAIN!",
        layoutImage: false,
      })
    }
    else if (prize == -1) {
      this.setState({
        layoutFirstText: "YOU HAVE NOT ENOUGTH MONEY!",
        layout: true,
        layoutImage: false,
      }) 
    }
    else if (prize > 0) {
      this.setState({
        layoutFirstText: `YOU WIN!`,
        layoutSecondText: `${prize}`,
        layoutImage: true,
      }) 
    }
  }

  handleClick() {
    this.makeSpinRequest()
  }
  
  handleStopSpinning() {
    this.setState({
      mustSpin: false,
      layout: true,
      balance: this.state.responseBalance,
      responseBalance: null,
      buttonDisabled: false,
    })
    this.props.updateWinners()
  }

  hideLayout() {
    this.setState({
      layout: false,
    })
  }
  
  render() {
    return (
      <>
        <div className='d-flex flex-column justify-content-between'>
          <WheelContainer startWheelSpin={this.startWheelSpin} prizeIndex={this.state.prizeIndex} onSpinningEnd={this.handleStopSpinning} mustSpin={this.state.mustSpin}/>
          <InfoGroup 
            buttonDisabled={this.state.buttonDisabled}
            layoutImage={this.state.layoutImage}
            hideLayout={this.hideLayout} 
            layoutFirstText={this.state.layoutFirstText} 
            layoutSecondText={this.state.layoutSecondText} 
            layout={this.state.layout} 
            onClick={this.handleClick} 
            balance={this.state.balance}/>
        </div>
      </>
    )
  }
}

function WindowSize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <>
      {windowWidth}
    </>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnersList: [],
      loaded: false,
      placeholder: "Loading",
      balance: 0,
      username: "",
      userLoggedIn: null,
      windowWidth: window.innerWidth,
    };
    this.getLastWinners = this.getLastWinners.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  handleWindowResize() {
    this.setState({
      windowWidth: window.innerWidth,
    }) 
  }

  async getUserBalance() {
    let obj;
    const res = await fetch('/API/UserBalance?format=json')
    obj = await res.json();
    this.setState({
      balance: obj['user_balance'],
      username: obj['username'],
    })
    console.log(obj['user_balance'])
  }

  async isUserLoggedIn() {
    let obj;
    const res = await fetch("/API/LoginChecker")
    obj = await res.json();
    this.setState({
      userLoggedIn: obj,
    })
    console.log(this.state.userLoggedIn)
  }

  async getLastWinners() {
    let obj;
    const res = await fetch('/API/Last20Winners?format=json')
    obj = await res.json();
    this.setState({
      winnersList: obj,
    })
    console.log(this.state.winnersList)
  }

  componentDidMount() {
    this.isUserLoggedIn()
    this.getUserBalance()
    this.getLastWinners()      
  }; 

  render() {
    window.addEventListener('resize', this.handleWindowResize);
    const classes = `p-1 container-m d-flex flex-${this.state.windowWidth < 1000 ? "column" : "row"} justify-content-center`
    if (this.state.userLoggedIn) {
      return (
        <>
          <div class="p-1 app-container d-flex flex-column justify-content-center text-center">
            <span className='main-title my-2 fs-1'>
              WHEEL OF FORTUNE!
            </span>
            <div className={classes}>
              <GameContainer updateWinners={this.getLastWinners} prizer={[1, 2, 3, 4, 5, 6]} balance={this.state.balance}/>
              <WinnerList winnersList={this.state.winnersList} />   
            </div>
          </div>
        </>
      )
    } else {
      return (
        <AuthForm></AuthForm>
      )
    }
  }
}

export default App;

const container = document.getElementById("winners-list");
const root = createRoot(container);
root.render(<App tab="home"/>);