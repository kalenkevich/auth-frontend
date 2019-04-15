const origin = window.location.origin;

export default {
  AppName: 'Auth',
  TwitterAppId: 'o61j1KfJuizWXmGJbSFhwNnNa',
  TwitterAppRedirectUrl: `${origin}/social/twitter/callback`,
  FacebookAppId: '2624843640924018',
  FacebookAppRedirectUrl: `${origin}/social/facebook/callback`,
  LinkedInAppId: '77teax3v9i5w46',
  LinkedInAppRedirectUrl: `${origin}/social/linkedin/callback`,
  VkAppId: '6942977',
  VkAppRedirectUrl: `${origin}/social/vk/callback`,
  InstagramAppId: 'be3112c86a1449f1877023263dafe3bc',
  InstagramAppRedirectUrl: `${origin}/social/instagram/callback`,
  GoogleAppId: '814016031269-105vip495ib3q2usb4jq3htb09054os0.apps.googleusercontent.com',
  GoogleAppRedirectUrl: `${origin}/social/google/callback`,
};
