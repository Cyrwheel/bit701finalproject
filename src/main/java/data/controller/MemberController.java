package data.controller;

import data.dto.MemberDto;
import data.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/member")
@AllArgsConstructor
public class MemberController {

    MemberService memberService;

    @PostMapping("/insert")
    public void insert(@RequestBody MemberDto dto)
    {
        memberService.insertMember(dto);
    }

    @GetMapping("/list")
    public List<MemberDto> list()
    {
        return memberService.getAllMembers();
    }

    @DeleteMapping("/delete")
    public void delete(int num)
    {
        memberService.deleteMember(num);
    }

    @GetMapping("/getname")
    public String getName(String myid)
    {
        return memberService.getName(myid);
    }

    @GetMapping("/searchid")
    public int searchId(String myid)
    {
        return memberService.getSearchId(myid);
    }

    @GetMapping("/login")
    public int login(String myid,String mypass)
    {
        return memberService.getLogin(myid, mypass);
    }



}
