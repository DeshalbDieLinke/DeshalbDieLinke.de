import React from 'react';
import {
  BlueskyIcon,
  BlueskyShareButton,
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';
import { ContentItem } from '@/types/ContentItem';

export default function CustomShare(props: {item: ContentItem}) {
  const exampleImage = props.item.url || '';
  const shareUrl = exampleImage;
  const title = '#DeshalbDieLinke';
      // const tweetText = title;
  // const shareUrlTwitter = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(exampleImage)}`

  return (
    <div className="Demo__container flex flex-wrap gap-2 p-2 justify-center">
      <div className="Demo__some-network">
        <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div className="Demo__some-network">
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <XIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div className="Demo__some-network">
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>

      <div className="Demo__some-network">
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div className="Demo__some-network">
        <PinterestShareButton
          url={String(window.location)}
          media={`${String(window.location)}/${exampleImage}`}
          className="Demo__some-network__share-button"
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
      </div>

      <div className="Demo__some-network">
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>

      <div className="Demo__some-network">
        <TumblrShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TumblrIcon size={32} round />
        </TumblrShareButton>
      </div>

      <div className="Demo__some-network">
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body="body"
          className="Demo__some-network__share-button"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>

      <div className="Demo__some-network">
        <PocketShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <PocketIcon size={32} round />
        </PocketShareButton>
      </div>

      <div className="Demo__some-network">
        <ThreadsShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <ThreadsIcon size={32} round />
        </ThreadsShareButton>
      </div>

      <div className="Demo__some-network">
        <BlueskyShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <BlueskyIcon size={32} round />
        </BlueskyShareButton>
      </div>
    </div>
  );
}

