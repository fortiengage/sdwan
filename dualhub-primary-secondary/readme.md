This directory includes all the scripts, the topology diagram, and the sample CVS files to deploy the Dual hub primary/secondary SDWAN use case. 

Note: User should download and customize it based on their real network, port and IP schemas. 
1. pre-run.j2: The scirpt will be used to run only once after FortiGate is linked and authorized by FortiManager.
2. sdwan-overlay.j2: SDWAN overlay scripts, it will be used to create sdwan-overlay templates.
3. topo.png: topology of this use case.
4. other-templates.j2: sample and other templates, such as IPsec, BGP, static route, etc.
5. device_info_sample.csv: device-level information.
6. sdwan_overlay_info_sample.csv: SDWAN overlay level information.

# Topology

### Underlay
This diagram provides the physical ports used by the topologies, as well as some key IP addresses and networks.
![Dual hub branch underlay](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/7.4/Dual%20hub/DH_SD_Underlay_74.png) 

### IPsec Overlay
This is the first step of the overlay to indicate the various IPSec VPN tunnels that are established over the underlay. The diagram associates the tunnel paths with the naming convention.
![Dual hub branch overlay IPsec](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/7.4/Dual%20hub/DH_SD_IPSec_74.png) 

### BGP Overlay
This topology builds on the IPSec overlay topology to indicate how BGP settings on the hub and branch devices are selected.
![Dual hub branch overlay BGP](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/7.4/Dual%20hub/DH_SD_bgp_74.png) 
