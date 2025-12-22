// components/VideoRoom.tsx

"use client";

import { useEffect, useRef } from "react";
import { JITSI_DOMAIN } from "@/lib/constants";
import { useStore } from "@/lib/store";

interface VideoRoomProps {
  roomId: string;
  roomName: string;
  onLeave: () => void;
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function VideoRoom({ roomId, roomName, onLeave }: VideoRoomProps) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiInstance = useRef<any>(null);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    // Carregar script do Jitsi
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) {
        initializeJitsi();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://${JITSI_DOMAIN}/external_api.js`;
      script.async = true;
      script.onload = initializeJitsi;
      document.body.appendChild(script);
    };

    const initializeJitsi = () => {
      if (!jitsiContainerRef.current || !currentUser) return;

      const options = {
        roomName: `franca-office-${roomId}`,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
          prejoinConfig: {
            enabled: false,
          },
          disableDeepLinking: true,
          enableClosePage: false,
          defaultLanguage: "pt",
          resolution: 720,
          constraints: {
            video: {
              height: { ideal: 720, max: 1080, min: 360 },
            },
          },
          hideConferenceSubject: false,
          hideConferenceTimer: false,
          subject: roomName,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "fodeviceselection",
            "hangup",
            "profile",
            "chat",
            "recording",
            "livestreaming",
            "etherpad",
            "sharedvideo",
            "settings",
            "raisehand",
            "videoquality",
            "filmstrip",
            "feedback",
            "stats",
            "shortcuts",
            "tileview",
            "download",
            "help",
            "mute-everyone",
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          DEFAULT_BACKGROUND: "#081534",
          DEFAULT_LOCAL_DISPLAY_NAME: currentUser.name,
          DEFAULT_REMOTE_DISPLAY_NAME: "Participante",
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
          DISABLE_PRESENCE_STATUS: false,
          MOBILE_APP_PROMO: false,
          DISPLAY_WELCOME_PAGE_CONTENT: false,
          DISABLE_VIDEO_BACKGROUND: false,
          VERTICAL_FILMSTRIP: true,
        },
        userInfo: {
          displayName: currentUser.name,
          email: `${currentUser.id}@francaassessoria.com`,
        },
        // Configurações JWT (não usadas mas podem ajudar)
        jwt: undefined,
      };

      jitsiInstance.current = new window.JitsiMeetExternalAPI(
        JITSI_DOMAIN,
        options
      );

      // Forçar entrada automática (bypass prejoin)
      jitsiInstance.current.addEventListener("readyToClose", () => {
        onLeave();
      });

      // Event listeners
      jitsiInstance.current.addEventListener("videoConferenceLeft", () => {
        onLeave();
      });

      jitsiInstance.current.addEventListener("videoConferenceJoined", () => {
        console.log("Entrou na conferência!");
      });
    };

    loadJitsiScript();

    // Cleanup
    return () => {
      if (jitsiInstance.current) {
        jitsiInstance.current.dispose();
        jitsiInstance.current = null;
      }
    };
  }, [roomId, currentUser, onLeave]);

  return (
    <div ref={jitsiContainerRef} className="w-full h-full" id="jitsi-container" />
  );
}
