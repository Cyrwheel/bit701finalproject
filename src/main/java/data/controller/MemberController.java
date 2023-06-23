package data.controller;

import data.dto.MemberDto;
import data.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/member")
@AllArgsConstructor
public class MemberController {

    MemberService memberService;

    @PostMapping("/insert")
    public void insert(@RequestBody MemberDto dto)
    {
        System.out.println("insert"+dto);
        memberService.insertMember(dto);
    }

    @GetMapping("/list")
    public List<MemberDto> list()
    {
        System.out.println("insert");
        return memberService.getAllMembers();
    }

    @DeleteMapping("/delete")
    public void delete(int num)
    {
        System.out.println("insert"+num);
        memberService.deleteMember(num);
    }

    @GetMapping("/getname")
    public String getName(String myid)
    {
        System.out.println("get name"+myid);

        return memberService.getName(myid);
    }

    @GetMapping("/searchid")
    public int searchId(String myid)
    {
        System.out.println(" searchid"+myid);
        return memberService.getSearchId(myid);
    }

    @GetMapping("/login")
    public Map<String,String> login(String myid, String mypass)
    {
        System.out.println(" login=>>"+myid+","+mypass);

        int n= memberService.getLogin(myid, mypass);
        //성공시 가입한 이름도 같이 보낸다
        String myname="";
        if(n==1) {
            myname=memberService.getName(myid);
        }
        Map<String,String> map = new HashMap<>();
        map.put("success",n==1?"yes":"no"); //res success가 yes는 성공 no는 실패
        map.put("myname",myname);
        return map;
    }



}
