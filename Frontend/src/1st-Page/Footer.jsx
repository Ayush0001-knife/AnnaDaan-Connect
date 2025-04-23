import React from "react";
import styles from "../1st-Page/footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo and About */}
        <div className={styles.section}>
          <h2 className={styles.logo}>AnnaDaan Connect</h2>
          <p className={styles.description}>
            Connecting food surplus to those in need, making a positive impact
            on our community.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="#" className={styles.link}>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Post Food
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Notifications
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Donation Status
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                History
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@annadaanconnect.org"
              className={styles.contactLink}
            >
              support@annadaanconnect.org
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+918800274093" className={styles.contactLink}>
              +91 8800274093
            </a>
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © 2025 AnnaDaan Connect. All rights reserved.
        </p>
        <div className={styles.legalLinks}>
          <a href="#" className={styles.legalLink}>
            Privacy Policy
          </a>
          <a href="#" className={styles.legalLink}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
