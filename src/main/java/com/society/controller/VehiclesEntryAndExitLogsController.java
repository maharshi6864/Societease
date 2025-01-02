package com.society.controller;

import com.society.dto.EntryAndExitDto;
import com.society.models.BlockVo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@RestController
public class VehiclesEntryAndExitLogsController {

    @GetMapping(value = "admin/vehicleEntryAndExitLogs")
    public ModelAndView vehicleEntryAndExitLogs() {
//        List<BlockVo> list = this.blockService.searchBlock();
        return new ModelAndView("admin/vehicleEntryAndExitLogs");
    }

    @GetMapping(value = "admin/getVehicleEntryAndExitLogs")
    public List<EntryAndExitDto> getVehicleEntryAndExitLogs() {
        List<EntryAndExitDto> entryAndExitDtoList = new ArrayList<>();

        // Adding 10 random data
        entryAndExitDtoList.add(new EntryAndExitDto("10:00 AM", "Entry", "ABC1234", "Known", "Owner01", "http://example.com/image1.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("10:15 AM", "Exit", "DEF5678", "Unknown", "Owner02", "http://example.com/image2.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("10:30 AM", "Entry", "GHI9012", "Known", "Owner03", "http://example.com/image3.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("10:45 AM", "Exit", "JKL3456", "Known", "Owner04", "http://example.com/image4.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("11:00 AM", "Entry", "MNO7890", "Unknown", "Owner05", "http://example.com/image5.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("11:15 AM", "Exit", "PQR2345", "Known", "Owner06", "http://example.com/image6.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("11:30 AM", "Entry", "STU6789", "Unknown", "Owner07", "http://example.com/image7.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("11:45 AM", "Exit", "VWX0123", "Known", "Owner08", "http://example.com/image8.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("12:00 PM", "Entry", "YZA4567", "Unknown", "Owner09", "http://example.com/image9.jpg"));
        entryAndExitDtoList.add(new EntryAndExitDto("12:15 PM", "Exit", "BCD8901", "Known", "Owner10", "http://example.com/image10.jpg"));

        return entryAndExitDtoList;
    }


}
