export interface VoicePlayerType {
  waveSurfer?: object;
  pauseAll?: () => void;
  keyName?: string;
  url?: string;
  status?: string;
  data?: string;
  cancel?: () => void;
  retry?: () => void;
}
