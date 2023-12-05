import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="ScrollBar">
      <h5
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold ",
          zIndex: "50",
        }}
      >
        Privacy Policy
      </h5>
      <h3 style={{ padding: '0.5rem 0rem' }}>Last updated: November 19, 2023</h3>
      <p>
        Welcome to REI Litics! We acknowledge that it is critical for you to
        have your privacy protected when you visit our Website and make use of
        our Services. This Privacy Policy describes our privacy practices,
        including how we collect, use, share and secure your personal data when
        you use our Services. It also informs you of your personal data rights
        as our user. Please note that in addition to all applicable privacy laws
        in the United States, we also comply with the General Data Protection
        Regulation 679/2016, which may grant specific rights to users who access
        the Platform from the European Economic Area.
      </p>
      <p>
        Please carefully read this Privacy Policy before accessing the REI
        Litics Website located at{" "}
        <a href="www.reilitics.com ">www.reilitics.com </a>(hereinafter the
        “Platform,” or “Website,”). The Platform is controlled by SRG Creative
        Group LLC, a Company formed and operating in accordance with the laws of
        the State of New York (the “Company,” “we,” “us,” or “our”).
      </p>
      <p>
        We will not process your personal data in any manner other than as
        described in this Privacy Policy. When you visit our Website, subscribe
        to our newsletter, or sign up for a user account, you agree to the
        processing of your personal data in accordance with this Privacy Policy.
        If you do not agree with any provision of this Privacy Policy, please do
        not access the Platform.
      </p>
      <p>
        Please note that this Privacy Policy does not control or describe the
        privacy practices of any third-party websites that you may access
        through links made available on our Platform.
      </p>
      <br/>
      <h3 style={{ fontWeight: 'bold', color: 'gray' }}>Table of Contents</h3>
      <br/>
      
      <ul style={{ paddingLeft: '0rem' }}>
        <li>
          <a href="#covered_by_policy">
            <span></span> Who is covered by
            this Privacy Policy?
          </a>
        </li>
        <li>
          <a href="#definitions">
            <span></span> Definitions
          </a>
        </li>
        <li>
          <a href="#personal_data">
            <span></span> What personal data
            do we collect, and how do we use it?
          </a>
          <ul style={{ paddingLeft: '0rem' }}>
            <li>
              <a href="#per_data">
                <span></span> Personal data
                we collect
              </a>
              <ul style={{ paddingLeft: '0rem' }}>
                <li>
                  <a href="#vol_data">
                    <span></span> Voluntarily
                    Submitted Personal Data
                  </a>
                </li>
                <li>
                  <a href="#auto_data">
                    <span></span>{" "}
                    Automatically collected data
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li>
          <a href="#sharing_your_personal">
            <span></span> Sharing your
            personal data
          </a>
          <ul style={{ paddingLeft: '0rem' }}>
            <li>
              <a href="#third_party_service">
                <span className="toc_number toc_depth_3"></span> Third-Party
                Service Providers
              </a>
            </li>
            <li>
              <a href="#change_of_ownership">
                <span className="toc_number toc_depth_3"></span> Change of
                Ownership
              </a>
            </li>
            <li>
              <a href="#to_protect_ourselves">
                <span className="toc_number toc_depth_3"></span> To protect
                ourselves or our users
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#secure_your_data">
            <span></span> How do we secure
            your data?
          </a>
        </li>
        <li>
          <a href="#dnt">
            <span></span> Do Not Track (DNT)
            data?
          </a>
        </li>
        <li>
          <a href="#data_sub">
            <span></span> Data Subject Rights
            in the European Economic Area data?
          </a>
        </li>

        <li>
          <a href="#child_pri">
            <span></span> Children’s Privacy
          </a>
        </li>

        <li>
          <a href="#links">
            <span></span> Third-Party Links
          </a>
        </li>

        <li>
          <a href="#amend">
            <span></span> Amendments
          </a>
        </li>

        <li>
          <a href="#contact_us  ">
            <span></span> Contact Us
          </a>
        </li>
      </ul>
      <ul className="toc_list">
        <li id="covered_by_policy">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">1. Who is covered by
          this Privacy Policy?</span> 
          <ul>
            <p>
              This Privacy Policy covers individuals who visit our Website,
              sign-up for a user account, and subscribe to our newsletter.
            </p>
          </ul>
        </li>
        <br/>
        <li id="definitions">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">2. Definitions</span> 
          <ul>
            <p>
              Unless expressly defined otherwise in our Terms of Use, the
              following words shall have the meaning as defined below:
            </p>
            <div className="d-flex">
              <p className="policy-p">Account Holder</p>
              <p>
                refers to a user who registers a user account on the Platform.
              </p>
            </div>
            <div className="d-flex">
              <p className="policy-p">
                “Data Controller, ” “Personal Data,” and “Processing”
              </p>
              <p>
                shall have the same meaning as defined in Article 4 of the
                General Data Protection Regulation 679/2016.
              </p>
            </div>
            <div className="d-flex">
              <p className="policy-p">Data Subject</p>
              <p>
                refers to any individual who accesses/uses the Platform and
                whose personal data is collected/processed by the Company.
              </p>
            </div>
            <div className="d-flex">
              <p className="policy-p">Services </p>
              <p>
                means the Website/Platform, including all content/information
                provided on the Platform, software features/functionality, and
                customer support.
              </p>
            </div>
            <div className="d-flex">
              <p className="policy-p">User </p>
              <p>
                refers to an account holder, Website visitor, or newsletter
                subscriber.
              </p>
            </div>
            <div className="d-flex">
              <p className="policy-p">User Account</p>
              <p>
                means the Platform account provided by the Company to a user,
                which enables the user to securely log in to the Platform and
                make use of the features and functionality.
              </p>
            </div>
          </ul>
        </li>
        <br/>
        <li id="personal_data">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">3. What personal data
          do we collect, and how do we use it?</span>
          <ul>
            <p>
              There is some personal data that you voluntarily provide us with
              when you use our Platform and some personal data that we are able
              to collect automatically from your access/use our Service.
              Regardless of whether we receive your personal data directly from
              you or automatically, we will only process it for purposes
              outlined below and other purposes which may be compatible with the
              initial purpose for which we collected your personal information.
            </p>
            <p>
              Please note if you are accessing our Service from the European
              Union, we rely on a legal basis such as your consent (Article
              6(1)(a) of GDPR), the performance of a contract (Article 6(1)(b)
              of GDPR), or legitimate interest (Article 6(1)(f)).
            </p>
            <p>
              You may decline to provide any personal data when requested by the
              Company. However, you understand that your refusal to provide any
              personal data required for the provision of our Service may result
              in us not being able to deliver the Service to you.
            </p>
            <p>
              The exact elements of personal information that we collect from
              you may also depend on whether you are using the Platform as a
              Website Visitor or user account holder.
            </p>
          </ul>
          <ul>
            <li id="per_data">
              <p style={{ textDecoration: 'underline', fontSize: '1.8rem' }}>Personal data we collect</p>
              <ul id="vol_data">
                <li>
                  ● Voluntarily Submitted Personal Data
                  <ul>
                    <li>
                      <p style={{ textDecoration: 'underline' }}>○ User Account Data</p>
                      <p>
                        When you register a user account on the Platform, you
                        provide us with some personal data, including your full
                        name, email address, profile image, date of birth, and
                        state/country. Please note that if you decide to
                        purchase a day pass or subscribe to our monthly
                        subscription, you will also be required to provide your
                        payment card details to our payment processor (“User
                        Account Data”).
                      </p>
                    </li>
                    <br/>
                    <li>
                      <p style={{ textDecoration: 'underline' }}>Why do we process the User Account Data? </p>
                      <p>
                        We process your User Account Data for purposes including
                        but not limited to: <br />■ Creating your user account
                        on the Platform; <br />■ Enabling you to securely sign
                        in to your user account and make use of the Platform
                        features and functionality;
                        <br /> ■ To enable you to make payment for your selected
                        plan; and <br />■ Contacting you as and when needed.
                      </p>
                    </li>
                    <br/>
                    <li>
                      <p style={{ textDecoration: 'underline' }}> Legal basis for processing User Account Data</p>
                      <p>
                        e rely upon Article 6(1)(b) of the GDPR, the performance
                        of a contract to which the data subject is a party, as
                        the legal basis for processing the User Account Data.
                      </p>
                    </li>
                    <br/>
                    <li>
                      <p style={{ textDecoration: 'underline' }}> Retention Period </p>
                      <p>
                        We may retain a user’s User Account Data for up to six
                        months after the termination of the user’s User Account.
                        At the end of the six-month period, we will remove all
                        User Account Data and may only retain information that
                        cannot be linked back to the user. Please note that we
                        may be allowed to keep your User Account Data for a
                        longer duration on other lawful grounds.
                      </p>
                    </li>
                    <br/>
                  </ul>
                </li>
                <li>
                  <p style={{ textDecoration: 'underline' }}> ○ Newsletter Subscription Data </p>
                  When you subscribe to receive our newsletter on the Website,
                  we collect your full name and email address. <br />
                  <br />
                  <p style={{ textDecoration: 'underline' }}>Why do we process ‘Newsletter Subscription Data’?</p>
                  We use the Newsletter Subscription Data to send you our
                  newsletter as well as other marketing communication, including
                  any special offers, promotions, and freebies. <br />
                  <br />
                  <p style={{ textDecoration: 'underline' }}>Legal basis for processing support data</p>
                  We rely upon Article 6(1)(f) of GDPR, our legitimate
                  interests, as our legal basis for processing this data.
                  <br/><br/>
                  <p style={{ textDecoration: 'underline' }}>Retention Period</p>
                  We will retain your Newsletter Subscription Data until such
                  time that you withdraw your consent. You can withdraw your
                  consent at any time by clicking the ‘unsubscribe’ link at the
                  bottom of our electronic newsletter or by sending an opt-out
                  message to
                  <a href="hello@reilitics.com">hello@reilitics.com</a> from the
                  same email that you provided when you subscribed to the
                  newsletter.
                </li>
                <br/>
                <li>
                  <p style={{ textDecoration: 'underline' }}>○ Survey Data </p>
                  We may occasionally invite you to participate in our
                  user surveys. Participation in these surveys is completely
                  voluntary, and you are not required to provide any personal
                  information if you choose not to do so. <br /><br/>
                  <p style={{ textDecoration: 'underline' }}>Why do we process ‘Survey Data’?</p> 
                  We use Surveys to improve our understanding of how users use
                  our Services, how we can improve our current services, and the
                  new services that our users may find interesting.<br/><br/>
                  <p style={{ textDecoration: 'underline' }}>Legal basis for processing support data</p>
                  We rely upon Article 6(1)(f) of GDPR, our legitimate
                  interests, as our legal basis for processing this data.<br/><br/>
                  <p style={{ textDecoration: 'underline' }}>Retention Period</p> 
                  We will retain any personal information included in our
                  survey data for up to six months after the date that we
                  initially sent the survey to our users.
                </li>
                <br/>
                <li>
                  <p style={{ textDecoration: 'underline' }}> Support Request Data </p>
                  The Company also receives personal data directly from a
                  user when a user sends a support request to the Company
                  (“Support data”). Support data may include a user’s name,
                  email address, and the content of the message (“Support
                  Data”). Support data may also include any other personal data
                  requested by the Company in order to service a user’s support
                  request. <br /><br/>
                  <p style={{ textDecoration: 'underline' }}>Why do we process ‘support data’?</p>
                  We process this data to understand and service a user’s
                  support request and to follow up with the user if required.{" "}<br/><br/>
                  <p style={{ textDecoration: 'underline' }}>Legal basis for processing support data</p> 
                  We rely upon Article 6(1)(f) of GDPR, our legitimate
                  interests, as our legal basis for processing this data. <br /><br/>
        
                  <p style={{ textDecoration: 'underline' }}>Retention Period</p> 
                  We will retain the support data for up to six months
                  after the date of your last communication to us. We may retain
                  the content of the support request past the retention period
                  by anonymizing it for our internal business purposes.
                </li>
              </ul>
            </li>
            <br/>
            <li id="auto_data">
              ● Automatically collected data
              <ul>
                {" "}
                <p style={{ textDecoration: 'underline' }}>Analytics Data</p>
                Our Platform makes use of Google Analytics
                services to automatically collect information about our users,
                such as our user's Internet Protocol (IP) address, their browser
                type, and version, date/time of a user visits our Platform, the
                pages they visit, and their interests. Google Analytics makes
                use of cookies. Please visit our Cookie Policy to learn more.
                <br /><br/>
                <p style={{ textDecoration: 'underline' }}>Why do we process Analytics Data?</p>
                 We process analytics data to improve your user
                experience, and we may also use this data to serve targeted
                advertisements to our users.
                <br/><br/>
                <p style={{ textDecoration: 'underline' }}>Legal Basis for Processing</p>
         
                Our legal basis is our legitimate interest Article 6(1)(f),
                which does not override our users’ rights.<br/><br/>
                <p style={{ textDecoration: 'underline' }}>Retention of Analytics Data</p> 
                Analytics data is not retained for more than 90 days from the
                date of your last visit.
              </ul>
            </li>
          </ul>
        </li>
        <br/>
        <li id="sharing_your_personal">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">4. Sharing your
          personal data</span>
          <p style={{ paddingLeft: '2rem' }}>
            We do not participate in the practice of selling or renting our
            users’ personal data. We only share our users’ personal data with
            third parties in the following circumstances:
          </p>
          <div style={{ paddingLeft: '4rem' }}>
          <ul id="third_party_service">
            <span className="toc_number toc_depth_1"></span>● Third-Party
            Service Providers
            <li>
              We may be required to share your personal data with third-party
              service providers that we engage during the performance of our
              business operations. Please note that we will only disclose your
              personal information that is necessary for our Service Providers
              to perform their obligations on our behalf. Such third-party
              service providers will only use your personal data as authorized
              by us, and in no event will they be allowed to use it for any
              purpose other than those specified in this Privacy Policy.
            </li>
          </ul>
          <br/>
          <ul id="change_of_ownership">
            ● Change of Ownership
            <li>
              If in the future, we buy a business or are acquired by another
              business, our users’ personal data may be disclosed to the new
              entity as part of due diligence and transferred as part of the
              commercial transaction. We assure you that in the event of any
              such changes in ownership, your personal data will continue to be
              governed by this Privacy Policy, except in cases where you
              expressly consent otherwise.
            </li>
          </ul>
          <br/>
          <ul id="to_protect_ourselves">
            ● To protect ourselves or our users
            <li>
              We will disclose your personal data to comply with the law; to
              enforce our Agreement with you; to defend ourselves in legal
              actions, or to protect our users or others from threats posed by
              your actions, including but not limited to sharing your data with
              other organizations as part of fraud protection.
            </li>
          </ul>
          </div>
        </li>
        <br/>
        <li id="secure_your_data">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">5. How do we secure
          your data?</span> 
          <ul>
            <p>
              Our Platform is designed with the security of data in mind. We
              only transmit our users’ data using encryption protocols. We also
              use a secure third-party payment processor to collect and process
              our users’ payment data, so none of the sensitive financial data
              is collected or stored on our database. We also restrict access to
              data within our Company on a need-to-know basis to prevent
              unauthorized access. All user accounts are password-protected, and
              we restrict the use of an account by multiple users. Regardless of
              the security measures that we have put in place, you acknowledge
              that the transmission of data over the internet is never one
              hundred percent secure. Accordingly, we cannot offer any
              guarantees as to the absolute security of your personal data.
            </p>
          </ul>
        </li>
        <br/>
        <li id="dnt">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">6 Do Not Track (DNT)</span> 
          <ul>
            <p>
              Please note that we do not respond to DNT signals by changing our
              data collection and use practices.
            </p>
          </ul>
        </li>
        <br/>
        <li id="data_sub">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">7 Data Subject Rights
          in the European Economic Area</span> 
          <ul>
            <p>
              If you make use of the Service from the European Economic Area
              (EEA), you have the following rights to access and edit the
              personal information that we hold for you. You can exercise your
              right by signing in to your user account on the Platform or
              sending us a data subject request from the same email address that
              you used to sign-up for the Platform. In some circumstances, you
              may also request the deletion of your personal data. Where our
              legal basis for processing your personal data is your consent, you
              have the right to withdraw your consent.
            </p>
            <p>
              You can send your data subject requests to us at
              <a href="hello@reilitics.com">hello@reilitics.com</a>, and we will
              respond to your request within 30 days.
            </p>
          </ul>
        </li>
        <br/>
        <li id="child_pri">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">8 Children’s Privacy</span> 
          <ul>
            <p>
              We are committed to protecting children’s privacy. The Platform
              does not allow users under the age of 18 years to sign up for a
              user account. If you believe that a child has provided his/her
              personal information to us, please contact us, and we will
              investigate the matter and take appropriate action.
            </p>
          </ul>
        </li>
        <br/>
        <li id="links">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">9 Third-Party Links</span> 
          <ul>
            <p>
              The Platform contains web links to websites that are
              owned/operated by third parties. When you click on any such links,
              you will be directed to such a third party’s website. Our Privacy
              Policy does not govern how these third parties process your
              personal data. We encourage you to carefully review any such
              third-party's privacy policy before making use of their website.
              The presence of any third-party links on our Platform does not
              constitute an endorsement or recommendation of such a third party,
              and we cannot be held responsible for such a third party’s
              actions.
            </p>
          </ul>
        </li>
        <br/>
        <li id="amend">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">10 Amendments</span> 
          <ul>
            <p>
              Our Platform is designed with the security of data in mind. We
              only transmit our users’ data using encryption protocols. We also
              use a secure third-party payment processor to collect and process
              our users’ payment data, so none of the sensitive financial data
              is collected or stored on our database. We also restrict access to
              data within our Company on a need-to-know basis to prevent
              unauthorized access. All user accounts are password-protected, and
              we restrict the use of an account by multiple users. Regardless of
              the security measures that we have put in place, you acknowledge
              that the transmission of data over the internet is never one
              hundred percent secure. Accordingly, we cannot offer any
              guarantees as to the absolute security of your personal data.
            </p>
          </ul>
        </li>
        <br/>
        <li id="contact_us">
          <span style={{ fontWeight: 'bold', fontSize: '2rem' }} className="toc_number toc_depth_1">11 Contact Us</span> 
          <ul>
            <p>
              If you have any questions, comments, or inquiries regarding this
              Privacy Policy, please contact us at:
            </p>
            <br />
            <p>
              Email:{" "}
              <a href="mailto:hello@reilitics.com"> hello@reilitics.com</a>
            </p>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
