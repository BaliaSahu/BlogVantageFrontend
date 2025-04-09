import React, { useContext } from 'react'
import { Context } from '../../main'
const About = () => {
  const { mode, setmode } = useContext(Context)
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">

        <h2>About</h2>
        <p>
          <p>
            Welcome to Blog Vantage, your go-to destination for insightful content, expert tips, and engaging discussions. Our blogging website is dedicated to bringing you high-quality articles on  technology, lifestyle, travel, business, etc. helping you stay informed, inspired, and entertained.
          </p>
          <p>
            Who We Are?
          </p>
          <p></p>
          At Blog Vantage, we are a team of passionate writers, researchers, and industry experts who believe in the power of knowledge-sharing. Whether you’re looking for the latest trends, expert advice, or creative ideas, our blog is designed to provide valuable content that resonates with our readers.
          <p>Our Mission</p>

          <p>
            Our mission is to create a space where ideas, stories, and insights can be shared freely. We aim to empower our audience with well-researched, engaging, and practical information that can enhance their daily lives and professional journeys.
          </p>
          <p>
            What We Offer?
          </p>
          <p>
            Informative Blog Posts – Covering a wide range of topics to keep you updated and knowledgeable.
          </p>
          <p>
            Expert Advice – Insights from professionals and experienced individuals in various fields.


          </p>
          <p>
            Community Engagement – A platform for discussion, interaction, and knowledge exchange.

            Guides & Tutorials – Step-by-step resources to help you learn and grow.
          </p>
          <p>

            Why Choose Us?
          </p>
          <p>
            Quality Content – We prioritize accuracy, depth, and originality in our articles.

            User-Friendly Experience – Our blog is easy to navigate, making it simple to find relevant information.

            Regular Updates – Stay ahead with fresh content posted regularly.

            Passionate Writers – Enthusiasts and experts dedicated to sharing valuable insights.
          </p>
          <p>

            Join Our Community
          </p>
          <p>

            We love connecting with our readers! Follow us on social media, subscribe to our newsletter, and engage with our posts to be a part of our growing community. If you have any suggestions, questions, or feedback, feel free to reach out to us at [your contact email].

            Thank you for visiting [Your Blog Name]. We hope you enjoy reading our content as much as we enjoy creating it!

          </p>
        </p>
      </div>
    </article>
  )
}

export default About