<template>
<div>
  <div class="container">
    <div class="row row-table bet-hearder">
      <div class="col-xs-6"><a href="javascript:;"><i class="fa fa-bitcoin"></i><span class="title">Bet Game</span></a></div>
      <div class="col-xs-6">
        <div class="col-xs-4">
          <a href="game-introduce.docx" target="_blank" style="color:#fff; padding-top:20px; font-size:15px; font-weight:600; line-height:40px;">Operation Manual</a>
        </div>
        <div class="col-xs-4">
          <a href="/#/cn" style="color:#fff; padding-top:20px; font-size:12px; font-weight:600; line-height:40px;">中文</a>
        </div>
        <div class="col-xs-4"><a href="javascript:;" class="link" title="telegram"><i class="fa fa-telegram" aria-hidden="true"></i></a></div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row row-table">
      <div class="col-md-8">
        <div class="row bet-round">
          <div class="col-sm-4"><div class="bet-round-item">The {{rid}} Round</div></div>
          <div class="col-sm-4"><div class="bet-round-item bet-round-color-1">Total {{betTotal}} ETH</div></div>
          <div class="col-sm-4"><button type="button" class="btn btn-success" @click="showCashWin">CASH</button></div>
        </div>
        <div class="row bet-pannel">
          <div class="col-md-12">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h3 class="panel-title"><i class="fa fa-bars"></i> Choose Panel</h3>
                </div>
                <div class="panel-body">
                  <div class="row bet-center">
                    <div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(1)" :class="renderNumCss(1)">1</button></div>
                    <div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(5)" :class="renderNumCss(5)">5</button></div>
                    <div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(10)" :class="renderNumCss(10)">10</button></div>
                    <div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(20)" :class="renderNumCss(20)">20</button></div>
                    <div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(50)" :class="renderNumCss(50)">50</button></div>
                    <div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(90)" :class="renderNumCss(90)">90</button></div>
                    <!--<div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(200)" :class="renderNumCss(200)">200</button></div>
                    <div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(500)" :class="renderNumCss(500)">500</button></div>
                    <div class="col-xs-4 bet-choose-item"><button type="button" @click="changeNum(1000)" :class="renderNumCss(1000)">1000</button></div>-->
                  </div>
                  <div class="row">
                    <div class="col-md-2">
                      RoomId：<input type="text" class="form-control" v-model="roomId" placeholder="RoomId"/>
                    </div>
                    <div class="col-md-2">
                      Count：<input type="text" class="form-control" v-model="checkNum" placeholder="Count"/>
                    </div>
                    <div class="col-md-4">
                      <button type="button" class="btn btn-primary bet-full btn-lg" @click="bet"><i class="fa fa-shopping-cart"></i>&nbsp;Buy</button>
                    </div>
                    <div class="col-md-4">
                      <button type="button" class="btn btn-info bet-full btn-lg" @click="showTickets(true)"><i class="fa fa-ticket"></i>&nbsp;Tickets<span class="badge bet-badge">{{ticketCount}}</span></button>
                    </div>
                  </div>
                </div>
            </div>
            <div class="well well-sm" style="display:none">
              <div class="row bet-well">
                <div class="col-md-8">
                  In The Last Round Your Ticket <span class="label label-danger">10001</span>  won the <font style="color:#e00">First</font> prize.
                </div>
                <div class="col-md-4">
                  <button type="button" class="btn btn-success" @click="withDraw">CASH</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row bet-pannel">
          <div class="col-md-12">
            <div class="panel panel-warning">
              <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-sort-amount-desc"></i> Last 5 Round
                <a href="javascript:;" style="float:right;">more <i class="fa fa-mail-forward"></i></a>
                </h3>
              </div>
              <div class="panel-body" style="overflow-x:auto;">
                <table class="table table-striped">
                  <thead>
                    <tr>
                        <th>ROUND</th>
                        <th>FIRST</th>
                        <th>SECOND</th>
                        <!--<th>THIRD</th>-->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in awardRecordList" :key="item.rid">
                        <td>{{item.rid}}</td>
                        <td><div class="bet-ticket" style="background:#888">{{renderTicket(item.first)}}</div></td>
                        <td><button type="button" class="btn btn-success" @click="showHisWinDialog(item.rid, 2)">Show</button></td>
                        <!--<td><button type="button" class="btn btn-success" @click="showHisWinDialog(item.rid, 3)">Show</button></td>-->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bet-rank">
          <form class="form-horizontal" role="form" style="padding-bottom:10px;">
            <div class="form-group">
              <label class="control-label"><span style="color:#eee">METAMASK</span><br/>{{isInjected}}</label>
            </div>
            <div class="form-group">
              <label class="control-label"><span style="color:#eee">NetWork</span><br/>{{network}}</label>
            </div>
            <div class="form-group">
              <label class="control-label"><span style="color:#eee">CoinBase</span><br/>{{coinbase}}</label>
            </div>
            <div class="form-group">
              <label class="control-label"><span style="color:#eee">Balance</span><br/>{{ethBalance}}&nbsp;ETH</label>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="sRoomId" placeholder="RoomId" style="width:70%; float:left;">
              <button type="button" class="btn btn-default" @click="Seartch()" style="float:right;">Seartch</button><br/>
              <label class="control-label" style="float:left;">Room Balance: {{roomBalance}}</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="myModal" style="display:block" v-if="showTicketsDialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="showTickets(false)">&times;</button>
                <h4 class="modal-title" id="myModalLabel">My Tickets</h4>
            </div>
            <div class="modal-body" style="max-height:500px; overflow:auto">
              <div class="bet-ticket" v-for="ticket in tickets" :key="ticket">{{renderTicket(ticket)}}</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" @click="showTickets(false)">Close</button>
            </div>
        </div>
    </div>
  </div>
  <div class="modal" style="display:block" v-if="showCashDialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="showCashWin(false)">&times;</button>
                <h4 class="modal-title">Cash</h4>
            </div>
            <div class="modal-body">
              RoundId:<input type="text" v-model="cashRoundId"/>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" @click="showCashWin(false)">Close</button>
                <button type="button" class="btn btn-success" data-dismiss="modal" @click="cashComfirm()">Comfirm</button>
            </div>
        </div>
    </div>
  </div>
  <div class="modal" style="display:block" v-if="showHisDialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="showHisWin(false)">&times;</button>
                <h4 class="modal-title">Award Tickets</h4>
            </div>
            <div class="modal-body">
              <span v-for="ticket in awardTickets" :key="ticket" >
                <div class="bet-ticket" v-if="checkAward(awardRid, ticket)">{{renderTicket(ticket)}}</div>
                <div class="bet-ticket" else-if style="background:#888">{{renderTicket(ticket)}}</div>
              </span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" @click="showHisWin(false)">Close</button>
            </div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
export default {
  beforeCreate () {
    this.$store.dispatch('registerWeb3')
  },
  data () {
    return {
      leftTime: '00:00:00',
      ticketNumDefaultCss: 'btn btn-success btn-circle',
      tickets: [],
      checkNum: 50,
      showTicketsDialog: false,
      rid: 1,
      roomId: 1,
      betTotal: 0,
      sRoomId: 1,
      roomBalance: 0,
      cashRoundId: 1,
      showCashDialog: false,
      awardRecordList: [],
      awardTickets: [],
      awardRid: 1,
      uticketList: [],
      showHisDialog: false
    }
  },
  computed: {...mapState({
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
    balance: state => state.web3.balance,
    ethBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    }
  }),
  ticketCount: function () {
    return this.tickets.length
  }},
  methods: {
    showTickets: function (flag) {
      this.showTicketsDialog = flag
    },
    leftTimer: function () {
      var today = new Date()
      var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0)
      var leftTime = tomorrow - today // 计算剩余的毫秒数
      var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
      var minutes = parseInt(leftTime / 1000 / 60 % 60, 10)// 计算剩余的分钟
      var seconds = parseInt(leftTime / 1000 % 60, 10)// 计算剩余的秒数
      hours = this.checkTime(hours)
      minutes = this.checkTime(minutes)
      seconds = this.checkTime(seconds)
      this.leftTime = hours + ':' + minutes + ':' + seconds
    },
    checkTime: function (i) { // 将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    renderNumCss: function (num) {
      if (this.checkNum !== num) {
        return 'btn btn-success btn-circle'
      } else {
        return 'btn btn-danger btn-circle'
      }
    },
    changeNum: function (num) {
      this.checkNum = num
    },
    renderTicket (ticket) {
      let tkt = ticket + ''
      let len = tkt.length
      let pad = 3 - len
      let pre = ''
      for (let i = 0; i < pad; i++) {
        pre = pre + '0'
      }
      return pre + tkt
    },
    bet: function () {
      let betNum = parseInt(this.checkNum, 10)
      let roomId = parseInt(this.roomId, 10)
      if (betNum < 1) {
        alert('投注数量不能小于1')
        return
      }
      if (!roomId || roomId > 100 || roomId < 1) {
        alert('error! roomId <= 100 and roomId >= 1')
        return
      }
      this.$store.state.contractInstance().buyTickets(betNum, roomId, {
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(0.03 * betNum, 'ether'),
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          let onNewTicket = this.$store.state.contractInstance().onNewTicket()
          console.log(onNewTicket)
          onNewTicket.watch((err, result) => {
            if (err) {
              console.log('0000', err)
            } else {
              console.log('1111', result)
              let args = result.args
              let count = parseInt(args.count, 10)
              console.log('count:', count)
              let rid = parseInt(args.rid, 10)
              console.log('rid:', rid)
              let start = parseInt(args.start, 10)
              console.log('start:', start)
              this.getUserTicket()
            }
          })
        }
      })
    },
    getUserTicket: function () {
      this.$store.state.contractInstance().getUserTicket.call(this.rid,
        { from: this.$store.state.web3.coinbase },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
            this.tickets = result.map(item => parseInt(item))
          }
        })
    },
    withDraw: function () {
      var rid = 1
      if (this.rid > 1) { rid = this.rid - 1 }
      this.$store.state.contractInstance().withdraw.call(rid,
        { from: this.$store.state.web3.coinbase },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
          }
        })
    },
    getLastAwardInfo: function (rid) {
      this.$store.state.contractInstance().getLastAwardInfo.call(rid, { from: this.$store.state.web3.coinbase },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(parseInt(result[0], 10))
          }
        })
    },
    getCurrentAroundInfo: function () {
      this.$store.state.contractInstance().getCurRoundInfo.call(
        { from: this.$store.state.web3.coinbase },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
            this.rid = parseInt(result[0], 10)
            this.betTotal = this.$store.state.web3.web3Instance().fromWei(parseInt(result[1], 10), 'ether')
            this.getUserTicket()
            this.seartch()
            if (this.rid > 1) {
              this.cashRoundId = this.rid - 1
              this.getLastAwardInfo(this.rid - 1)
              this.getAwardRecordList(0)
              this.geUticketListList(0)
            }
          }
        })
    },
    seartch: function () {
      let rid = parseInt(this.rid, 10)
      let roomId = parseInt(this.sRoomId, 10)
      if (!roomId || roomId > 100 || roomId < 1) {
        alert('error! roomId <= 100 and roomId >= 1')
        return
      }
      this.$store.state.contractInstance().getRoomBalance.call(rid, roomId, { from: this.$store.state.web3.coinbase },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            this.roomBalance = this.$store.state.web3.web3Instance().fromWei(parseInt(result, 10), 'ether')
          }
        })
    },
    showCashWin: function (flag) {
      this.showCashDialog = flag
    },
    cashComfirm: function () {
      var rid = this.cashRoundId
      this.showCashDialog = false
      this.$store.state.contractInstance().withdraw(rid,
        { gas: 300000, from: this.$store.state.web3.coinbase },
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
          }
        })
    },
    getAwardRecordList: function (i) {
      if (i >= 5 || this.awardRecordList.length > i + 1) { return }
      var rid = this.rid - i - 1
      if (rid >= 1) {
        this.$store.state.contractInstance().getLastAwardInfo.call(rid,
          { from: this.$store.state.web3.coinbase },
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              let first = parseInt(result[0], 10)
              let second = result[1].map(item => {
                return parseInt(item, 10)
              })
              // let third = result[2].map(item => {
              //   return parseInt(item, 10)
              // })
              // this.awardRecordList.push({rid: rid, first: first, second: second, third: third})
              this.awardRecordList.push({rid: rid, first: first, second: second})
              this.getAwardRecordList(i + 1)
            }
          })
      }
    },
    geUticketListList: function (i) {
      if (i >= 5) { return }
      var rid = this.rid - i - 1
      if (rid >= 1) {
        this.$store.state.contractInstance().getUserTicket.call(rid,
          { from: this.$store.state.web3.coinbase },
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              let tickets = result.map(item => parseInt(item))
              this.uticketList.push({rid: rid, tickets: tickets})
              this.geUticketListList(i + 1)
            }
          })
      }
    },
    showHisWinDialog (rid, level) {
      this.showHisDialog = true
      let record
      this.awardRecordList.forEach(item => { if (item.rid === rid) { record = item } })
      switch (level) {
        case 2:
          record = record.second
          break
        case 3:
          record = record.third
          break
        default:
          record = []
          break
      }
      this.awardTickets = record
      this.awardRid = rid
    },
    checkAward (rid, ticket) {
      var flag = false
      let utickets = []
      this.uticketList.forEach(item => {
        if (item.rid === rid) { utickets = item.tickets }
      })
      utickets.forEach(item => {
        if (ticket === item) { flag = true }
      })
      return flag
    },
    showHisWin (flag) {
      this.showHisDialog = flag
    }
  },
  mounted: function () {
    setInterval(() => { this.leftTimer() }, 1000)
    this.$store.dispatch('getContractInstance')
  },
  watch: {
    balance () {
      this.getCurrentAroundInfo()
    }
  }
}
</script>
