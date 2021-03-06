import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import Image from 'gatsby-image'
import styled from 'styled-components'

import { primary, secondary } from '../../variants'

import ReadLink from '../read-link'
import SEO from '../seo'

const PostImage = styled(Image)`
  max-height: 400px;
  margin-bottom: 1.45em;
`

const Post = styled(motion.div)`
  margin-top: -2.75rem;

  @media screen and (max-width: 600px) {
    margin-top: -4.3rem;
  }
`

const NextPrev = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const PostTemplate = ({ data: { markdownRemark: post }, pageContext }) => {
  const { next, prev, credit } = pageContext
  return (
    <>
      <SEO
        title={post.frontmatter.title}
        image={post.frontmatter.image.sharp.fluid.src}
        lang='en'
      />
      <Post initial='exit' animate='enter' exit='exit'>
        <motion.div variants={primary}>
          <PostImage
            fluid={post.frontmatter.image.sharp.fluid}
            alt={post.frontmatter.title}
            className='full-bleed'
          />
        </motion.div>
        <motion.div variants={secondary}>
          <h1>{post.frontmatter.title}</h1>
          <p
            css={`
              color: var(--text-primary);
              font-weight: bold;
              margin-bottom: 0.25rem;
            `}
          >
            Written by {post.frontmatter.author}
          </p>
          <p
            css={`
              color: var(--text-primary);
              font-weight: bold;
            `}
          >
            {post.frontmatter.date}
          </p>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <div
            css={`
              font-size: 12px;
              color: var(--text-primary);
              p {
                display: flex;
                justify-content: flex-end;
              }
              a {
                margin: 0 4px;
              }
            `}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: credit }}
          />
        </motion.div>
        <NextPrev variants={secondary}>
          {prev && (
            <ReadLink to={prev.fields.slug}>
              &larr; {prev.frontmatter.title}
            </ReadLink>
          )}
          {next && (
            <ReadLink to={next.fields.slug}>
              {next.frontmatter.title} &rarr;{' '}
            </ReadLink>
          )}
        </NextPrev>
      </Post>
    </>
  )
}

export const pageQuery = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        author
        title
        image {
          sharp: childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

PostTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

PostTemplate.defaultProps = {
  data: {},
  pageContext: {},
}

export default PostTemplate
