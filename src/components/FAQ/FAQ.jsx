import { useEffect } from 'react'
import './FAQ.scss'
const FAQ = () => {
  useEffect(() => {
    const accordion = document.getElementsByClassName('faqContentBx')
    let i

    for (i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener('click', function () {
        this.classList.toggle('activeAcc')
      })
    }
  }, [])

  return (
    <div className="faqContainer">
      <div className="faqCont" id="faq">
        <h1>Have questions? We’ve got you</h1>
        <div className="faqBox">
          <div className="faqContentBx">
            <div className="faqLabel">What is NFT? </div>
            <div className="faqContent">
              <p>
                * NFT stands for non-fungible tokens; they are
                non-interchangeable units of data stored on the blockchain and
                can be represented by several digital forms.
                <br />
                <br />* An NFT cannot be changed like-for-like like bitcoin or
                any other digital asset.
                <br />
                <br />* NFT has a wide array of uses, depending on the creator’s
                choice.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">What are NFT collections? </div>
            <div className="faqContent1">
              <p>
                * These are a number of NFTs that look alike at their base but
                are essentially different in properties, characteristics, and
                utilities.
                <br />
                <br />* A collection is created by a team or a project e.g
                BoredApes, meebits, cryptopunks etc.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">What is “Gas War”? </div>
            <div className="faqContent2">
              <p>
                * A Gas war is an event that occurs as a result of multiple
                people attempting to mint a project or from an NFT collection at
                the same time which causes a pool of transactions more than the
                network can handle per block.
                <br />
                <br />* In this case, financial politics is often at play via
                the transaction fee (gas).
                <br />
                <br /> * The higher the transaction fee, the higher the chances
                of getting your transaction processed successfully and fast.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">What is an NFT whitelist? </div>
            <div className="faqContent">
              <p>
                * An NFT whitelist is a list of eligible Hash addresses that
                would be added to an NFT collection’s smart contract to allow
                such addresses Mint from the collection without having to
                experience gas wars and other anomalies.
                <br />
                <br />* NFT whitelisting is a process of getting a wallet
                address pre-approved for minting an NFT out of an NFT
                collection.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">How do I get whitelisted? </div>
            <div className="faqContent">
              <p>
                * You can get whitelisted by being active, early, or in an
                advantageous position acknowledged by an NFT project.
                <br />
                <br />* Some ways in which whitelist spots are earned are: being
                helpful within the project’s community discord, drawing your own
                version of that project’s NFT, supporting the project by
                advertising using your platform, performing activities required
                by the project.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">Why is whitelisting logical?</div>
            <div className="faqContent2">
              <p>
                * It is only fair and logical for early supporters of a project
                to be given an edge in certain situations.
                <br />
                <br />* To ensure early supporters are able to mint, their
                wallet addresses are often pre-approved, so they do not become
                victims of “Gas War”.
                <br />
                <br />
                * It reduces the tendency for an NFT collection to look scammy.
                <br />
                <br />* It helps promote the NFT project and creates demand and
                supply through public appeal
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">Can I sell above mint price? </div>
            <div className="faqContent">
              <p>
<<<<<<< HEAD
                * You are advised to sell at a reasonable price for ease of sale, preferably below the mint price of the project.
                <br />
                <br />* Free mint lists are advised to sell at less than $50 per spot for ease of sale .
                <br />
=======
                * No, you cannot sell above mint price .
                <br />
                <br />* List ads are only valid if sell price is set at 50% less
                than mint price .
                <br />
                <br />* This allows risk-sharing and helps Buylist ensure an
                ethical and fair market.
>>>>>>> 9e2cbdee2204558c2020eab8101c0613cec705e8
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">What is BuyList?</div>
            <div className="faqContent2">
              <p>
                * Buylist is an NFT whitelist marketplace; it connects buyers
                and sellers of whitelisting spots in a peer-to-peer fashion,
                powered by smart contract.
                <br />
                <br />* Buylist helps NFT enthusiasts to curate upcoming mints
                through direct mail notifications.
                <br />
                <br />* Buylist uses a unique algorithm to provide NFT data such
                as trending NFTs and upcoming NFTs available for public view and
                use.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">
              <p>How do I buy whitelisting spots on BuyList?</p>
            </div>
            <div className="faqContent1">
              <p>
                * We have prepared a step-by-step guide on how to buy on
                BuyList.
                <br />
                <br />* Kindly click <strong>here </strong> to get started.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">
              <p>How do I sell whitelisting spots on BuyList? </p>
            </div>
            <div className="faqContent1">
              <p>
                * We have prepared a step-by-step guide on how to buy on
                BuyList.
                <br />
                <br />* Kindly click <strong>here </strong> to get started.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">
              {' '}
              <p>How is fraud prevented on BuyList?</p>
            </div>
            <div className="faqContent1">
              <p>
                * Fraud is prevented via smart contract, escrow and dispute
                resolution measures, to ensure everyone has an enjoyable
                experience.
                <br />
                <br />* Bad actors are disincentivized to use BuyList.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">
              <p>
                Apart from buying and selling of whitelisting spots, what else
                can I do on BuyList?
              </p>
            </div>
            <div className="faqContentsm">
              <p>
                BuyList allows you to curate upcoming mints, and set
                notification for the mint dates.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">
              <p>What is the payment method on BuyList?</p>
            </div>
            <div className="faqContentsm">
<<<<<<< HEAD
              <p>The payment method is USDC.</p>
=======
              <p>The payment method is BUSD.</p>
>>>>>>> 9e2cbdee2204558c2020eab8101c0613cec705e8
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">
              <p>Do I pay fees when using Buylist?</p>
            </div>
            <div className="faqContent">
              <p>
<<<<<<< HEAD
                * A one-off payment of 10 USDC is required to transact with a seller .
                <br />
                <br /> * A 5% deduction from the seller is tenable to users of Buylist.
=======
                * A one-off payment of 20 BUSD is required to transact with a
                seller and a subsequent payment of 5BUSD.
                <br />
                <br /> * A 2% deduction from the seller is tenable to users of
                Buylist.
>>>>>>> 9e2cbdee2204558c2020eab8101c0613cec705e8
                <br />
                <br /> * No other fee is required to use Buylist.
              </p>
            </div>
          </div>
          <div className="faqContentBx">
            <div className="faqLabel">Is Buylist safe?</div>
            <div className="faqContentsm">
              <p>Buylist is completely safe to use.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
