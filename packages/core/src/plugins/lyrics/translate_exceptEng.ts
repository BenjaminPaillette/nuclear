import logger from 'electron-timber';
import lyrics from 'simple-get-lyrics';
import translate from 'google-translate-open-api';
import { getOption } from '../../index';

import LyricsProvider from '../lyricsProvider';

class TranslateNotEngLyricsProvider extends LyricsProvider {
  constructor() {
    super();
    this.name = 'Translate Lyrics (except English) Provider Plugin';
    this.sourceName = 'Translate (except English) Lyrics Provider';
    this.description = 'Translate lyrics provider plugin. Uses several sources with fallbacks. Songs with english lyrics will not be translated';
    this.image = null;
    this.isDefault = false;
  }

  search(artistName: string, trackName: string): string {
    const toTranslate = getOption('language').split('-')[0].split('_')[0];

  
    return lyrics.search(artistName, trackName)
      .then(result => {
        return translate(result.lyrics, {to: toTranslate})
          .then(res => { 
            if (res.data[1] === toTranslate || 'en'===toTranslate) {
              return result.lyrics; 
            }
            return res.data[0]; 
          }).catch(function (err) {
            logger.log('error', err); return result.lyrics;
          });
      })
      .catch(function (err) {
        logger.log('error', err);
      });
    
  }
}

export default TranslateNotEngLyricsProvider;
