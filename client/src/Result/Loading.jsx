import React from 'react'
import JsBarcode from 'jsbarcode'

class Loading extends React.Component {
  componentDidMount = () => {
    JsBarcode('#barcode')
      .options({
        font: 'monospace',
        background: '#f4f4f4',
        lineColor: '#777',
        height: 50,
      }) // Will affect all barcodes
      .EAN13(this.props.isbn, { fontSize: 18, textMargin: 0, })
      .render()
  }

  render = () => (
    <div className="bg-near-white gray h-fill flex justify-center">
      <div className="mv7">
        <h3>Searching the web for</h3>
        <svg id="barcode" className="ani-perspective mv3" />
      </div>
    </div>
  )
}

export default Loading
