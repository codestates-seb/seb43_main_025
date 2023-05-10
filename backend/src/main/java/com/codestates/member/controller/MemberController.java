package com.codestates.member.controller;

import com.codestates.auth.utils.ErrorResponse;
import com.codestates.common.response.MultiResponseDto;
import com.codestates.member.dto.MemberDto;
import com.codestates.member.entity.Member;
import com.codestates.member.entity.MemberRoom;
import com.codestates.member.mapper.MemberMapper;
import com.codestates.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;


@Validated
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }



    @PostMapping("/add")
    public ResponseEntity postMember (@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.postDtoToMember(requestBody);
        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(mapper.memberToPostResponseDto(createMember), HttpStatus.CREATED);
    }




    @PatchMapping("/{member-id}/edit")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody,
                                      Authentication authentication) {

        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long jwtMemberId = ((Number) principal.get("sub")).longValue();

        if(jwtMemberId != (memberId)) {
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.FORBIDDEN, "토큰 불일치 : 권한이 없는 사용자 입니다.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }

        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.patchDtoToMember(requestBody));
        return new ResponseEntity<>(mapper.memberToPatchResponseDto(member),HttpStatus.OK);
    }




    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId,
                                    Authentication authentication) {

        if(authentication == null) {
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, "미인증 사용자 : 토큰이 존재하지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToGetResponseDto(member), HttpStatus.OK);
    }




//    @GetMapping //회원 전체조회 필요없음
//    public ResponseEntity getMembers(@Positive @RequestParam("page") int page,
//                                     @Positive @RequestParam("size") int size) {
//        Page<Member> memberPage = memberService.findMembers(page-1, size);
//        List<Member> memberList = memberPage.getContent();
//        List<MemberDto.GetResponseDtos> responseDtosList = mapper.memberToGetResponseDtos(memberList);
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(responseDtosList, memberPage), HttpStatus.OK);
//    }




    @GetMapping("/{member-id}/like")
    public ResponseEntity getLikeRooms(@Positive @RequestParam("page") int page,
                                       @Positive @RequestParam("size") int size,
                                       @PathVariable("member-id") @Positive long memberId,
                                       Authentication authentication) {

        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long jwtMemberId = ((Number) principal.get("sub")).longValue();

        if(jwtMemberId != (memberId)) {
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.FORBIDDEN, "토큰 불일치 : 권한이 없는 사용자 입니다.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }

        Page<MemberRoom> memberRoomPage = memberService.findLikeRooms(page -1, size, memberId);
        List<MemberRoom> memberRoomList = memberRoomPage.getContent();
        List<MemberDto.LikeRoomResponseDtos> responseDtosList = mapper.memberToLikeResponseDtos(memberRoomList, memberId);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responseDtosList, memberRoomPage) , HttpStatus.OK);
    }




    @GetMapping("/{member-id}/created")
    public ResponseEntity getCreatedRoom(@Positive @RequestParam("page") int page,
                                         @Positive @RequestParam("size") int size,
                                         @PathVariable("member-id") @Positive long memberId,
                                         Authentication authentication) {

        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long jwtMemberId = ((Number) principal.get("sub")).longValue();

        if(jwtMemberId != (memberId)) {
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.FORBIDDEN, "토큰 불일치 : 권한이 없는 사용자 입니다.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }

        Page<MemberRoom> memberRoomPage = memberService.findCreatedRooms(page-1, size, memberId);
        List<MemberRoom> memberRoomList = memberRoomPage.getContent();
        List<MemberDto.CreatedRoomResponseDtos> responseDtosList = mapper.memberToCreatedResponseDtos(memberRoomList);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responseDtosList, memberRoomPage) , HttpStatus.OK);
    }




    @GetMapping("/{member-id}/record")
    public ResponseEntity getRecordRoom(@Positive @RequestParam("page") int page,
                                        @Positive @RequestParam("size") int size,
                                        @PathVariable("member-id") @Positive long memberId,
                                        Authentication authentication) {

        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long jwtMemberId = ((Number) principal.get("sub")).longValue();

        if(jwtMemberId != (memberId)) {
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.FORBIDDEN, "토큰 불일치 : 권한이 없는 사용자 입니다.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }

        Page<MemberRoom> memberRoomPage = memberService.findRecordRooms(page-1, size, memberId);
        List<MemberRoom> memberRoomList = memberRoomPage.getContent();
        List<MemberDto.RecordRoomResponseDtos> responseDtosList = mapper.memberToRecordResponseDtos(memberRoomList);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responseDtosList, memberRoomPage) , HttpStatus.OK);
    }




    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId,
                                       Authentication authentication) {

        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long jwtMemberId = ((Number) principal.get("sub")).longValue();

        if(jwtMemberId != (memberId)) {
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.FORBIDDEN, "토큰 불일치 : 권한이 없는 사용자 입니다.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        }

        memberService.removeUser(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
