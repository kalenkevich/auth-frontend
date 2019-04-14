import settings from '../../config/settings';
import {
  TWITTER,
  FACEBOOK,
  LINKEDIN,
  VK,
  INSTAGRAM,
  GOOGLE,
} from '../constants/providers';

export default class SocialAuthorizationService {
  static async initiateSocialSignIn(provider) {
    switch (provider) {
      case TWITTER: return this.initiateTwitterSignIn();
      case FACEBOOK: return this.initiateFacebookSignIn();
      case LINKEDIN: return this.initiateLinkedinSignIn();
      case VK: return this.initiateVkSignIn();
      case INSTAGRAM: return this.initiateInstagramSignIn();
      case GOOGLE: return this.initiateGoogleSignIn();
      default: return null;
    }
  }

  static getSocialCodeFromUrl() {
    return new URLSearchParams(window.location.search).get('code');
  }

  static initiateFacebookSignIn() {
    const safeUrl = encodeURIComponent(settings.FacebookAppRedirectUrl);

    window.location.href = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${settings.FacebookAppId}&redirect_uri=${safeUrl}&response_type=code`;
  }

  static initiateLinkedinSignIn() {
    const safeUrl = encodeURIComponent(settings.LinkedInAppRedirectUrl);

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?client_id=${settings.LinkedInAppId}&redirect_uri=${safeUrl}&response_type=code&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
  }

  static initiateVkSignIn() {
    const safeUrl = encodeURIComponent(settings.VkAppRedirectUrl);

    window.location.href = `https://oauth.vk.com/authorize?client_id=${settings.VkAppId}&display=page&redirect_uri=${safeUrl}&response_type=code&scope=email&v=5.95`;
  }

  static initiateInstagramSignIn() {
    const safeUrl = encodeURIComponent(settings.InstagramAppRedirectUrl);

    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${settings.InstagramAppId}&redirect_uri=${safeUrl}&response_type=code`;
  }

  static initiateGoogleSignIn() {
    const safeUrl = encodeURIComponent(settings.GoogleAppRedirectUrl);

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${settings.GoogleAppId}&redirect_uri=${safeUrl}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.profile.emails.read`;
  }
}
