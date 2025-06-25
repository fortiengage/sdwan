Deploy the FortiSwitch and FortiAP together with SD-WAN solution

1. **Add FortiGate model device**
   - FortiGate name: `branch1_lab130`

2. **Add the FortiSwitch model device**

   a) Create VLANs:
      - FortiAP management VLAN: WIFI_MGMT
      - SSID-related VLANs: using SSID name and VLAN ID in the WIFI CSV file.
   
   b) Create the FortiSwitch template:
      - Based on the FortiSwitch platform/model.
      - Create one trunk for each FortiAP by using the AP_NAME in the FAP CSV file, and put the port WC_FSW_PORT_NAME as member.
   
   c) Create the FortiSwitch model device

4. **Add the FortiAP model device**
   a) Create VAP/SSID as defined in the WIFI CSV file
   
   b) Create the FortiAP template:
      - According to the FortiAP model
   
   c) Create the FortiAP model device
   
- fsw.j2: Scripts to create a FortiSwitch model device on FortiManager
  Pre-requisite: VLAN and FortiSwitch template
- fap.j2: Scripts to create FAP model device on FortiManager
  Pre-requisite: FAP template and VAP/SSID
- fsp-vlan.j2: Script to create VLAN
- fsp-vlan-wifi-mgmt.j2: Script to creat the dedicated FAP management VLAN of "WIFI_MGMT". 
- vap-enterprise.j2: Create enterprise security SSID
- vap-personal.j2: Create the personal security SSID with a password

#"Management Port on FortiGate: By default, FortiEnage will create WIFI_MGMT VLAN with vlanid=3010 with access of ping and fabric enabled, and DHCP enable to assign IP to FAP"
#"VLAN interface of WIFI_MGMT default IP is 10.255.2.1/24, the DHCP server IP range is 10.255.2.2-10.255.2.254"
#WC_FSW_PORT_NAME: For creating the trunk on FortiSwitch for the AP using this port

FortiSwitch CSV:
| FSW_SN           | FSW_DESCRIPTION                   | FSW_MODEL             | FSW_FGT_NAME   | FSW_FGT_VDOM_NAME |
|------------------|-----------------------------------|------------------------|----------------|--------------------|
| S448EFTF23008043 | FortiSwitch connects to all FAPs  | FortiSwitch-448E-FPOE | branch1_lab130 | root               |
| S448EFTF23018129 | FortiSwitch First Floor           | FortiSwitch-448E-FPOE | branch2_lab130 | root               |

FAP CSV:
| AP_SN            | AP_TYPE | AP_NAME | WC_FGT_NAME   | WC_FGT_VDOM_NAME | WC_FSW_SN         | WC_FSW_PORT_NAME |
|------------------|---------|---------|---------------|------------------|--------------------|------------------|
| FP431FTF23099HHQ | FP431F  | AP1     | branch1_lab130| root             | S448EFTF23008043   | port2            |
| FP431FTF23099ZDV | FP431F  | AP2     | branch1_lab130| root             | S448EFTF23008043   | port3            |

WIFI/SSID CSV:
| SSID_Name   | Security_Option       | SSID_Password | VLAN_ID | VLAN_Interface_IP | VLAN_Interface_Network_Mask | Radio-1 | Radio-2 |
|-------------|------------------------|----------------|---------|--------------------|------------------------------|---------|---------|
| WIFI_Staff  | wpa2-only-enterprise   |                | 2100    | 172.17.192.1       | 255.255.255.0                | Y       | Y       |
| WIFI_Guest  | wpa2-only-person       | 123456789      | 3966    | 172.21.64.1        | 255.255.255.0                | Y       | Y       |
