// components/AvatarSelector.tsx
"use client";

import { AVATAR_OPTIONS } from "@/lib/avatars";
import {
  BearAvatar,
  CatAvatar,
  DogAvatar,
  FoxAvatar,
  KoalaAvatar,
  LionAvatar,
  MonkeyAvatar,
  OwlAvatar,
  PandaAvatar,
  PenguinAvatar,
  RabbitAvatar,
  TigerAvatar,
} from "@/app/components/avatars";

const AVATAR_COMPONENTS = {
  bear: BearAvatar,
  cat: CatAvatar,
  dog: DogAvatar,
  fox: FoxAvatar,
  koala: KoalaAvatar,
  lion: LionAvatar,
  monkey: MonkeyAvatar,
  owl: OwlAvatar,
  panda: PandaAvatar,
  penguin: PenguinAvatar,
  rabbit: RabbitAvatar,
  tiger: TigerAvatar,
};

export default function AvatarSelector({
  onSelect,
}: {
  onSelect: (avatar: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {AVATAR_OPTIONS.map((avatar) => {
        const Component = AVATAR_COMPONENTS[avatar];
        return (
          <button
            key={avatar}
            onClick={() => onSelect(avatar)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Component size={60} />
          </button>
        );
      })}
    </div>
  );
}
