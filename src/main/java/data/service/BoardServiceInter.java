package data.service;

import data.dto.BoardDto;

import java.util.List;

public interface BoardServiceInter {

    public int getTotalCount();

    public void insertBoard(BoardDto dto);

    public List<BoardDto> getPaginList(int start,int perpage);

    public void updateReadcount(int num);

    public BoardDto detailPage(int num);

    public void deleteBoard(int num);

}
