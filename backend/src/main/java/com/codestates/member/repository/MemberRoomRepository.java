package com.codestates.member.repository;

import com.codestates.member.entity.MemberRoom;
import com.codestates.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRoomRepository extends JpaRepository<MemberRoom, Long> {
    MemberRoom findByRoom(Room findRoom);
}
