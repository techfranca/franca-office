// lib/usePresence.ts

import { useEffect, useState } from 'react';
import { database, UserPresence } from './firebase';
import { ref, set, onValue, remove, onDisconnect } from 'firebase/database';
import { useStore } from './store';

export function usePresence() {
  const currentUser = useStore((state) => state.currentUser);
  const currentRoom = useStore((state) => state.currentRoom);
  const [presenceByRoom, setPresenceByRoom] = useState<Record<string, UserPresence[]>>({});

  // Atualizar presença quando entrar/sair de sala
  useEffect(() => {
    if (!currentUser) return;

    const userPresenceRef = ref(database, `presence/${currentUser.id}`);

    const updatePresence = async () => {
      if (currentRoom) {
        // Criar/atualizar presença
        const presenceData: UserPresence = {
          userId: currentUser.id,
          userName: currentUser.name,
          roomId: currentRoom,
          status: currentUser.status,
          timestamp: Date.now(),
        };

        await set(userPresenceRef, presenceData);

        // Configurar remoção automática ao desconectar
        onDisconnect(userPresenceRef).remove();
      } else {
        // Remover presença se não está em sala
        await remove(userPresenceRef);
      }
    };

    updatePresence();

    // Cleanup ao desmontar
    return () => {
      remove(userPresenceRef);
    };
  }, [currentUser, currentRoom]);

  // Escutar todas as presenças em tempo real
  useEffect(() => {
    const presenceRef = ref(database, 'presence');

    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      
      if (!data) {
        setPresenceByRoom({});
        return;
      }

      // Agrupar presenças por sala
      const grouped: Record<string, UserPresence[]> = {};
      
      Object.values(data).forEach((presence: any) => {
        const roomId = presence.roomId;
        if (!grouped[roomId]) {
          grouped[roomId] = [];
        }
        grouped[roomId].push(presence);
      });

      setPresenceByRoom(grouped);
    });

    return () => unsubscribe();
  }, []);

  return { presenceByRoom };
}