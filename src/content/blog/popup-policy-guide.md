## Downloads

Ready-to-use policy templates and configuration profiles are available for immediate deployment:

### Windows Templates (JSON Format)
- [Chrome Windows Policy](../../../docs/examples/popup-policy/chrome-windows.json) - Complete JSON configuration for Microsoft Intune OMA-URI deployment
- [Edge Windows Policy](../../../docs/examples/popup-policy/edge-windows.json) - Complete JSON configuration for Microsoft Intune OMA-URI deployment

### macOS Configuration Profiles (PLIST Format)
- [Chrome macOS Profile](../../../docs/examples/popup-policy/chrome-macos.plist) - Ready-to-deploy configuration profile for Chrome on macOS
- [Edge macOS Profile](../../../docs/examples/popup-policy/edge-macos.plist) - Ready-to-deploy configuration profile for Microsoft Edge on macOS
- [Safari macOS Profile](../../../docs/examples/popup-policy/safari-macos.plist) - Ready-to-deploy configuration profile for Safari on macOS

### Quick Copy Configurations

#### Chrome OMA-URI (Windows/Intune)
```xml
<enabled/>
<data id="PopupsAllowedForUrlsDesc" value="1https://*.company.com2https://app.salesforce.com3https://*.office.com"/>
```

#### Edge OMA-URI (Windows/Intune)
```xml
<enabled/>
<data id="PopupsAllowedForUrlsDesc" value="1https://*.company.com2https://portal.office.com3https://*.sharepoint.com"/>
```

#### Default Popup Setting (Both Chrome & Edge)
```xml
<enabled/>
<data id="DefaultPopupsSetting" value="2"/>
```

## Support & Resources

### Documentation Links
- [Chrome Enterprise Policy List](https://chromeenterprise.google/policies/)
- [Microsoft Edge Policy Reference](https://docs.microsoft.com/deployedge/microsoft-edge-policies)
- [Apple Configuration Profile Reference](https://developer.apple.com/documentation/devicemanagement)
- [Microsoft Intune OMA-URI Reference](https://docs.microsoft.com/mem/intune/configuration/)

### Change Log
- **v1.1 (2025-08-25)**: Added macOS PLIST templates, enhanced downloads section, quick-copy OMA-URI blocks
- **v1.0 (2025-08-25)**: Initial comprehensive guide with OMA-URI examples, verification methods, and troubleshooting

---
*This guide is maintained by the IT Security team. For questions or updates, contact: [support@aglobaltec.com](mailto:support@aglobaltec.com)*
