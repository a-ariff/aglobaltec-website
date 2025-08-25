---
title: 'Browser Popup Policy Management - MDM Automation Guide'
description: 'Comprehensive guide for managing browser popup policies across Chrome, Edge, and Safari using MDM solutions like Microsoft Intune'
pubDate: '2025-08-25'
updatedDate: '2025-08-25'
heroImage: '/blog-placeholder-3.jpg'
tags: ['MDM', 'Browser Policy', 'Intune', 'Chrome', 'Edge', 'Safari']
author: 'Ariff Mohamed'
---

# Browser Popup Policy Management - MDM Automation Guide

This comprehensive guide covers cross-platform browser popup policy management using Mobile Device Management (MDM) solutions, with focus on Microsoft Intune deployment scenarios.

## Overview

Popup blocking policies are essential for maintaining security posture and user productivity across enterprise environments. This guide provides implementation details for Chrome, Edge, and Safari across Windows and macOS platforms.

## Supported Browsers & Platforms

- **Google Chrome**: Windows 10/11, macOS 11+
- **Microsoft Edge**: Windows 10/11, macOS 11+  
- **Safari**: macOS 11+ (macOS only)

## Windows Configuration

### Chrome - Administrative Templates

#### Registry Configuration
```json
{
  "PopupsAllowedForUrls": [
    "https://*.company.com",
    "https://app.salesforce.com",
    "https://*.office.com"
  ],
  "PopupsBlockedForUrls": [
    "https://*.doubleclick.net",
    "https://*.googlesyndication.com"
  ],
  "DefaultPopupsSetting": 2
}
```

#### OMA-URI Configuration for Intune

**Allow Popups for Specific Sites**
- **OMA-URI**: `./Device/Vendor/MSFT/Policy/Config/Chrome~Policy~googlechrome~ContentSettings/PopupsAllowedForUrls`
- **Data Type**: String
- **Value**:
```xml
<enabled/>
<data id="PopupsAllowedForUrlsDesc" value="1&#xF000;https://*.company.com&#xF000;2&#xF000;https://app.salesforce.com&#xF000;3&#xF000;https://*.office.com"/>
```

**Block Popups for Specific Sites**
- **OMA-URI**: `./Device/Vendor/MSFT/Policy/Config/Chrome~Policy~googlechrome~ContentSettings/PopupsBlockedForUrls`
- **Data Type**: String  
- **Value**:
```xml
<enabled/>
<data id="PopupsBlockedForUrlsDesc" value="1&#xF000;https://*.doubleclick.net&#xF000;2&#xF000;https://*.googlesyndication.com"/>
```

**Default Popup Setting**
- **OMA-URI**: `./Device/Vendor/MSFT/Policy/Config/Chrome~Policy~googlechrome~ContentSettings/DefaultPopupsSetting`
- **Data Type**: String
- **Value**:
```xml
<enabled/>
<data id="DefaultPopupsSetting" value="2"/>
```

### Edge - Administrative Templates

#### Registry Configuration
```json
{
  "PopupsAllowedForUrls": [
    "https://*.company.com",
    "https://portal.office.com",
    "https://*.sharepoint.com"
  ],
  "PopupsBlockedForUrls": [
    "https://*.ads.microsoft.com",
    "https://*.doubleclick.net"
  ],
  "DefaultPopupsSetting": 2
}
```

#### OMA-URI Configuration for Intune

**Allow Popups for Specific Sites**
- **OMA-URI**: `./Device/Vendor/MSFT/Policy/Config/Microsoft Edge~Policy~microsoft_edge~ContentSettings/PopupsAllowedForUrls`
- **Data Type**: String
- **Value**:
```xml
<enabled/>
<data id="PopupsAllowedForUrlsDesc" value="1&#xF000;https://*.company.com&#xF000;2&#xF000;https://portal.office.com&#xF000;3&#xF000;https://*.sharepoint.com"/>
```

**Block Popups for Specific Sites**
- **OMA-URI**: `./Device/Vendor/MSFT/Policy/Config/Microsoft Edge~Policy~microsoft_edge~ContentSettings/PopupsBlockedForUrls`
- **Data Type**: String
- **Value**:
```xml
<enabled/>
<data id="PopupsBlockedForUrlsDesc" value="1&#xF000;https://*.ads.microsoft.com&#xF000;2&#xF000;https://*.doubleclick.net"/>
```

**Default Popup Setting**
- **OMA-URI**: `./Device/Vendor/MSFT/Policy/Config/Microsoft Edge~Policy~microsoft_edge~ContentSettings/DefaultPopupsSetting`  
- **Data Type**: String
- **Value**:
```xml
<enabled/>
<data id="DefaultPopupsSetting" value="2"/>
```

## macOS Configuration

### Chrome Configuration Profile

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key>
      <string>com.google.Chrome</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>com.company.chrome.popup.policy</string>
      <key>PayloadDisplayName</key>
      <string>Chrome Popup Policy</string>
      <key>PopupsAllowedForUrls</key>
      <array>
        <string>https://*.company.com</string>
        <string>https://app.salesforce.com</string>
        <string>https://*.office.com</string>
      </array>
      <key>PopupsBlockedForUrls</key>
      <array>
        <string>https://*.doubleclick.net</string>
        <string>https://*.googlesyndication.com</string>
      </array>
      <key>DefaultPopupsSetting</key>
      <integer>2</integer>
    </dict>
  </array>
  <key>PayloadDescription</key>
  <string>Chrome popup management policy</string>
  <key>PayloadDisplayName</key>
  <string>Chrome Popup Policy</string>
  <key>PayloadIdentifier</key>
  <string>com.company.chrome.popup.policy</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>12345678-1234-1234-1234-123456789012</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>
```

### Edge Configuration Profile

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key>
      <string>com.microsoft.Edge</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>com.company.edge.popup.policy</string>
      <key>PayloadDisplayName</key>
      <string>Edge Popup Policy</string>
      <key>PopupsAllowedForUrls</key>
      <array>
        <string>https://*.company.com</string>
        <string>https://portal.office.com</string>
        <string>https://*.sharepoint.com</string>
      </array>
      <key>PopupsBlockedForUrls</key>
      <array>
        <string>https://*.ads.microsoft.com</string>
        <string>https://*.doubleclick.net</string>
      </array>
      <key>DefaultPopupsSetting</key>
      <integer>2</integer>
    </dict>
  </array>
  <key>PayloadDescription</key>
  <string>Edge popup management policy</string>
  <key>PayloadDisplayName</key>
  <string>Edge Popup Policy</string>
  <key>PayloadIdentifier</key>
  <string>com.company.edge.popup.policy</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>87654321-4321-4321-4321-210987654321</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>
```

### Safari Configuration Profile

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key>
      <string>com.apple.Safari</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>com.company.safari.popup.policy</string>
      <key>PayloadDisplayName</key>
      <string>Safari Popup Policy</string>
      <key>BlockPopUpWindows</key>
      <true/>
      <key>SafariAllowPopUpsAndRedirects</key>
      <false/>
    </dict>
  </array>
  <key>PayloadDescription</key>
  <string>Safari popup management policy</string>
  <key>PayloadDisplayName</key>
  <string>Safari Popup Policy</string>
  <key>PayloadIdentifier</key>
  <string>com.company.safari.popup.policy</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>11223344-5566-7788-9900-112233445566</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>
```

## Policy Values Reference

### DefaultPopupsSetting Values
- `1` = Allow all sites to show popups
- `2` = Block all sites from showing popups (recommended)
- `3` = Ask when a site wants to show popups

## Verification Methods

### Chrome Policy Verification

**Windows & macOS:**
1. Navigate to `chrome://policy`
2. Click "Reload policies"
3. Verify the following policies are present:
   - `PopupsAllowedForUrls`
   - `PopupsBlockedForUrls` 
   - `DefaultPopupsSetting`

### Edge Policy Verification

**Windows & macOS:**
1. Navigate to `edge://policy`
2. Click "Reload policies"
3. Verify the following policies are present:
   - `PopupsAllowedForUrls`
   - `PopupsBlockedForUrls`
   - `DefaultPopupsSetting`

### macOS Command Line Verification

**Chrome:**
```bash
defaults read com.google.Chrome PopupsAllowedForUrls
defaults read com.google.Chrome PopupsBlockedForUrls  
defaults read com.google.Chrome DefaultPopupsSetting
```

**Edge:**
```bash
defaults read com.microsoft.Edge PopupsAllowedForUrls
defaults read com.microsoft.Edge PopupsBlockedForUrls
defaults read com.microsoft.Edge DefaultPopupsSetting
```

**Safari:**
```bash
defaults read com.apple.Safari BlockPopUpWindows
defaults read com.apple.Safari SafariAllowPopUpsAndRedirects
```

### Windows PowerShell Verification

**Chrome Registry Verification:**
```powershell
# Check Chrome popup policies
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Google\Chrome" -Name "PopupsAllowedForUrls" -ErrorAction SilentlyContinue
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Google\Chrome" -Name "PopupsBlockedForUrls" -ErrorAction SilentlyContinue
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Google\Chrome" -Name "DefaultPopupsSetting" -ErrorAction SilentlyContinue
```

**Edge Registry Verification:**
```powershell
# Check Edge popup policies  
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Edge" -Name "PopupsAllowedForUrls" -ErrorAction SilentlyContinue
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Edge" -Name "PopupsBlockedForUrls" -ErrorAction SilentlyContinue
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Edge" -Name "DefaultPopupsSetting" -ErrorAction SilentlyContinue
```

## Troubleshooting Guide

| **Symptom** | **Cause** | **Fix** |
|-------------|-----------|----------|
| Policy not appearing in browser://policy | Policy not applied/synced | Force MDM sync, restart browser, check OMA-URI syntax |
| Allowed sites still blocked | Conflicting policies or incorrect URL format | Review policy precedence, verify URL wildcards |
| Policies apply but popups still blocked | Browser extensions interfering | Disable popup blocker extensions, check extension policies |
| macOS profile not installing | Invalid plist syntax or permissions | Validate plist XML, check profile signing |
| Windows registry values missing | Insufficient permissions or Group Policy conflicts | Run as admin, check GPO precedence |
| Edge policies not working | Chrome policies conflicting | Separate policy configurations, check inheritance |
| Safari settings reverting | User overrides enabled | Disable user preference modification in profile |
| Intune deployment failing | Incorrect OMA-URI or malformed XML | Validate against ADMX template, test XML encoding |

## Security Best Practices

### 1. Allowlist Management
- Maintain minimal allowlist of essential business domains
- Regularly audit and remove unused entries
- Use specific subdomains instead of wildcards when possible
- Document business justification for each allowed domain

### 2. Blocklist Strategy
- Block known advertising and malware domains
- Include common popup abuse domains
- Update blocklists based on security intelligence
- Monitor for new threats and adjust accordingly

### 3. Policy Precedence
- Understand MDM vs Group Policy precedence
- Test in isolated environment before production
- Document policy interactions and conflicts
- Maintain clear change management process

### 4. Monitoring & Compliance
- Implement policy compliance reporting
- Monitor for unauthorized policy changes
- Audit browser configurations regularly
- Track security incident correlation with popup policies

## Review Schedule & Maintenance

### Monthly Reviews
- Review popup policy violations and user requests
- Analyze security logs for popup-related incidents
- Update allowlist/blocklist based on business needs
- Test policy effectiveness across browser versions

### Quarterly Reviews  
- Comprehensive security assessment of popup policies
- Review compliance with organizational security standards
- Update documentation and deployment guides
- Evaluate new browser features and policy options

### Annual Reviews
- Full audit of popup policy framework
- Benchmark against industry best practices
- Review and update security risk assessments
- Training updates for IT administrators

## Download Templates

Ready-to-use policy templates are available:

- [Chrome Windows Policy (JSON)](../../examples/popup-policy/chrome-windows.json)
- [Edge Windows Policy (JSON)](../../examples/popup-policy/edge-windows.json) 
- [Chrome macOS Profile (PLIST)](../../examples/popup-policy/chrome-macos.plist)
- [Edge macOS Profile (PLIST)](../../examples/popup-policy/edge-macos.plist)
- [Safari macOS Profile (PLIST)](../../examples/popup-policy/safari-macos.plist)

## Support & Resources

### Documentation Links
- [Chrome Enterprise Policy List](https://chromeenterprise.google/policies/)
- [Microsoft Edge Policy Reference](https://docs.microsoft.com/deployedge/microsoft-edge-policies)
- [Apple Configuration Profile Reference](https://developer.apple.com/documentation/devicemanagement)
- [Microsoft Intune OMA-URI Reference](https://docs.microsoft.com/mem/intune/configuration/)

### Change Log
- **v1.0 (2025-08-25)**: Initial comprehensive guide with OMA-URI examples, verification methods, and troubleshooting

---

*This guide is maintained by the IT Security team. For questions or updates, contact: [support@aglobaltec.com](mailto:support@aglobaltec.com)*
