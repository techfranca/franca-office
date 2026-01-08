// lib/useRoomLock.ts

import { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, set, onValue, remove } from 'firebase/database';
import { useStore } from './store';

export interface RoomLockState {
  locked: boolean;
  lockedBy: string | null;
  lockedByName: string | null;
  lockedAt: number | null;
}

export function useRoomLock(roomId: string) {
  const currentUser = useStore((state) => state.currentUser);
  const [lockState, setLockState] = useState<RoomLockState>({
    locked: false,
    lockedBy: null,
    lockedByName: null,
    lockedAt: null,
  });
  const [isLocking, setIsLocking] = useState(false);

  // Escutar estado da trava em tempo real
  useEffect(() => {
    if (!roomId || !database) return;

    const lockRef = ref(database, `rooms/${roomId}`);

    const unsubscribe = onValue(lockRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data && data.locked) {
        setLockState({
          locked: true,
          lockedBy: data.lockedBy,
          lockedByName: data.lockedByName,
          lockedAt: data.lockedAt,
        });
      } else {
        setLockState({
          locked: false,
          lockedBy: null,
          lockedByName: null,
          lockedAt: null,
        });
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  // Trancar sala
  const lockRoom = async () => {
    if (!currentUser || !roomId || isLocking || !database) return;

    setIsLocking(true);
    try {
      const lockRef = ref(database, `rooms/${roomId}`);
      await set(lockRef, {
        locked: true,
        lockedBy: currentUser.id,
        lockedByName: currentUser.name,
        lockedAt: Date.now(),
      });
    } catch (error) {
      console.error('Erro ao trancar sala:', error);
    } finally {
      setIsLocking(false);
    }
  };

  // Destrancar sala
  const unlockRoom = async () => {
    if (!currentUser || !roomId || isLocking || !database) return;

    // Só pode destrancar se foi você quem trancou
    if (lockState.lockedBy !== currentUser.id) {
      console.warn('Apenas quem trancou pode destrancar');
      return;
    }

    setIsLocking(true);
    try {
      const lockRef = ref(database, `rooms/${roomId}`);
      await remove(lockRef);
    } catch (error) {
      console.error('Erro ao destrancar sala:', error);
    } finally {
      setIsLocking(false);
    }
  };

  // Verificar se o usuário atual é quem trancou
  const isLockedByCurrentUser = lockState.locked && lockState.lockedBy === currentUser?.id;

  return {
    lockState,
    isLocking,
    lockRoom,
    unlockRoom,
    isLockedByCurrentUser,
    canEnterRoom: !lockState.locked, // Sala aberta ou usuário que trancou pode entrar
  };
}